import React from 'react';
import {Redirect} from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import {submitAuthenticatedForm} from '../helper/RequestHelper'
import {performAuthenticatedRequest} from '../helper/RequestHelper'
import Autosuggest, {ItemAdapter} from 'react-bootstrap-autosuggest'
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import EditButton from "./reusable/EditButton"
import SubmitButton from "./reusable/SubmitButton"
import TimePicker from 'rc-time-picker';
import DeleteButton from "./reusable/DeleteButton"
import DeleteModal from "./reusable/DeleteModal"

class PetAdapter extends ItemAdapter {
  renderItem(item) {
    return <div>{item.name}
      <span className="abbrev">
        {item.owner.name}</span>
    </div>
  }
}
PetAdapter.instance = new PetAdapter()

class EditBooking extends React.Component {
  constructor(props) {
    super(props);
    moment.locale('pt-br');
    this.state = {
      id: null,
      shouldRedirect: false,
      formsDisabled: false,
      checkinTime: moment(),
      checkoutTime: moment().add(1, 'days'),
      pet: null,
      pets: [],
      notes: ""
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state[event.target.name]);
    console.log(this.state);
  }

  onSelect(obj) {
    console.log(obj)
    this.setState({pet: obj})
  }

  deleteRequest() {
    performAuthenticatedRequest("bookingId/" + this.state.id, "DELETE").then((response) => {
      if (response.ok) {
        this.setState({shouldRedirect: true});
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    var content = this.state;
    console.log(JSON.stringify(content));
    submitAuthenticatedForm("booking", content).then((response) => {
      if (response.ok) {
        console.log("foi");
        this.setState({shouldRedirect: true});
      }
    });
  }

  componentDidMount() {
    const {
      match: {
        params: {
          bookingId
        }
      }
    } = this.props;
    console.log(bookingId);
    this.setState({
      formsDisabled: bookingId !== undefined
    });
    if (bookingId !== undefined) {
      performAuthenticatedRequest("bookingId/" + bookingId, "GET").then(results => {
        return results.json();
      }).then(data => {
        data.checkinTime = moment
          .utc(data.checkinTime)
          .local();
        data.checkoutTime = moment
          .utc(data.checkoutTime)
          .local();
        this.setState(data);
      })
    }
    performAuthenticatedRequest('pet', "GET").then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      this.setState({pets: data});
    });
  }

  render() {
    if (!this.state.shouldRedirect) {
      return (
        <div className="container">
          <h1>Dados da hospedagem:</h1>
          <Form
            horizontal
            onSubmit={this
            .handleSubmit
            .bind(this)}>

            <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
                Pet:
              </Col>
              <Col sm={10}>
                <Autosuggest datalist={this.state.pets} placeholder="Selecione ou digite o nome do pet" itemValuePropName="name" onSelect={this
                  .onSelect
                  .bind(this)} onChange={this.onSelectChange} disabled={this.state.formsDisabled} // datalistOnly
                  value={this.state.pet} valueIsItem={true} required itemAdapter={PetAdapter.instance}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalDate">
              <Col componentClass={ControlLabel} sm={2}>
                Data de entrada:
              </Col>
              <Col sm={1}>
                <SingleDatePicker date={this.state.checkinTime} // momentPropTypes.momentObj or null
                  disabled={this.state.formsDisabled} onDateChange={date => this.setState({checkinTime: date})} // PropTypes.func.isRequired
                  focused={this.state.focusedTwo} // PropTypes.bool
                  onFocusChange={({focused: focusedTwo}) => this.setState({focusedTwo})} // PropTypes.func.isRequired
                  id="your_unique_id" // PropTypes.string.isRequired,
                  numberOfMonths={1} readOnly/>
              </Col>
              <Col componentClass={ControlLabel} sm={2}>
                Hora de entrada:
              </Col>
              <Col sm={4}>
                <TimePicker
                  disabled={this.state.formsDisabled}
                  value={this.state.checkinTime}
                  showSecond={false}
                  minuteStep={15}
                  inputReadOnly
                  allowEmpty={false}
                  onChange={checkinTime => {
                  this.setState({checkinTime})
                }}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalDate">
              <Col componentClass={ControlLabel} sm={2}>
                Data de saída:
              </Col>
              <Col sm={1}>
                <SingleDatePicker date={this.state.checkoutTime} // momentPropTypes.momentObj or null
                  disabled={this.state.formsDisabled} onDateChange={date => this.setState({checkoutTime: date})} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                  id="your_unique_id_2" // PropTypes.string.isRequired,
                  numberOfMonths={1} readOnly/>
              </Col>
              <Col componentClass={ControlLabel} sm={2}>
                Hora de saída:
              </Col>
              <Col sm={4}>
                <TimePicker
                  disabled={this.state.formsDisabled}
                  value={this.state.checkoutTime}
                  showSecond={false}
                  minuteStep={15}
                  inputReadOnly
                  allowEmpty={false}
                  onChange={checkoutTime => {
                  this.setState({checkoutTime})
                }}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}>Observações</Col>
              <Col sm={10}>
                <FormControl
                  name="notes"
                  value={this.state.notes === null
                  ? ""
                  : this.state.notes}
                  componentClass="textarea"
                  disabled={this.state.formsDisabled}
                  rows={5}
                  onChange={this
                  .handleChange
                  .bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={2}>
                <SubmitButton show={!this.state.formsDisabled}/>
                <EditButton
                  onClick={() => {
                  this.setState({formsDisabled: false})
                }}
                  show={this.state.formsDisabled}/>
              </Col>
              <Col smOffset={7} sm={1}>
                <DeleteButton
                  onClick={() => {
                  this.setState({showModal: true})
                }}
                  show={this.state.id !== null}/>
              </Col>
            </FormGroup>
          </Form>
          <DeleteModal
            showModal={this.state.showModal}
            onClick={() => {
            this.setState({showModal: false})
          }}
            onDelete={this
            .deleteRequest
            .bind(this)}/>
        </div>
      );
    } else {
      return (<Redirect to='/hotel'/>);
    }
  }
}

export default EditBooking;