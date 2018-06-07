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
import Autosuggest from 'react-bootstrap-autosuggest'
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import EditButton from "./reusable/EditButton"
import SubmitButton from "./reusable/SubmitButton"

class EditSchedule extends React.Component {
  constructor(props) {
    super(props);
    moment.locale('pt-br');
    const {
      match: {
        params: {
          scheduleId
        }
      }
    } = this.props;
    this.state = {
      shouldRedirect: false,
      formsDisabled: false,
      startTime: moment(),
      endTime: moment(),
      type: "Banho",
      pet: null,
      pets: [],
      id: scheduleId,
      startTimeString: "",
      endTimeString: ""
    }
  }
  onTimeChange(event) {
    console.log(event.target.value);
    var [hours,
      minutes] = event
      .target
      .value
      .split(':');
    var date = this.state[event.target.name];
    date.set('hour', hours);
    date.set('minute', minutes);
    console.log(date.utcOffset());
    this.setState({
      [event.target.name]: date
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state[event.target.name]);
    console.log(this.state);
  }
  handleSubmit(event) {
    event.preventDefault();
    var content = this.state;
    console.log(JSON.stringify(content));
    submitAuthenticatedForm("https://toquinha.herokuapp.com/scheduleItem", content).then((response) => {
      if (response.ok) {
        console.log("foi");
        this.setState({shouldRedirect: true});
      }
    });
  }
  onSelect(obj) {
    console.log(obj)
    this.setState({pet: obj})
  }
  componentDidMount() {
    const {
      match: {
        params: {
          scheduleId
        }
      }
    } = this.props;
    console.log(scheduleId);
    this.setState({
      id: scheduleId,
      formsDisabled: scheduleId !== undefined
    });
    if (scheduleId !== undefined) {
      performAuthenticatedRequest("https://toquinha.herokuapp.com/scheduleItem/" + scheduleId, "GET").then(results => {
        return results.json();
      }).then(data => {
        data.startTime = moment
          .utc(data.startTime)
          .local()
        data.endTime = moment
          .utc(data.endTime)
          .local()
        data.startTimeString = data
          .startTime
          .clone()
          .format("HH:mm")
        data.endTimeString = data
          .endTime
          .clone()
          .format("HH:mm")
        this.setState(data);
      });
    }
    performAuthenticatedRequest('https://toquinha.herokuapp.com/pet', "GET").then(results => {
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
          <h1>Dados do agendamento:</h1>
          <Form
            horizontal
            onSubmit={this
            .handleSubmit
            .bind(this)}>
            <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
                Tipo:
              </Col>
              <Col sm={10}>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  name="type"
                  disabled={this.state.formsDisabled}
                  value={this.state.type}
                  onChange={this
                  .handleChange
                  .bind(this)}>
                  <option value="Banho">Banho</option>
                  <option value="Tosa">Tosa</option>
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
                Pet:
              </Col>
              <Col sm={10}>
                <Autosuggest datalist={this.state.pets} placeholder="Selecione ou digite o nome do pet" itemValuePropName="name" onSelect={this
                  .onSelect
                  .bind(this)} onChange={this.onSelectChange} disabled={this.state.formsDisabled} // datalistOnly
                  value={this.state.pet} valueIsItem={true}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalDate">
              <Col componentClass={ControlLabel} sm={2}>
                Data:
              </Col>
              <Col sm={10}>
                <SingleDatePicker date={this.state.startTime} // momentPropTypes.momentObj or null
                  disabled={this.state.formsDisabled} onDateChange={date => this.setState({
                  startTime: date,
                  endTime: date.clone()
                })} // PropTypes.func.isRequired
                  focused={this.state.focused} // PropTypes.bool
                  onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                  id="your_unique_id" // PropTypes.string.isRequired,
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Hora início:
              </Col>
              <Col sm={10}>
                <MaskedFormControl
                  disabled={this.state.formsDisabled}
                  type='text'
                  name='startTime'
                  mask='11:11'
                  value={this.state.startTimeString}
                  onChange={this
                  .onTimeChange
                  .bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Hora Fim:
              </Col>
              <Col sm={10}>
                <MaskedFormControl
                  disabled={this.state.formsDisabled}
                  type='text'
                  name='endTime'
                  mask='11:11'
                  value={this.state.endTimeString}
                  onChange={this
                  .onTimeChange
                  .bind(this)}/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <SubmitButton show={!this.state.formsDisabled}/>
                <EditButton
                  onClick={() => {
                  this.setState({formsDisabled: false})
                }}
                  show={this.state.formsDisabled}/>
              </Col>
            </FormGroup>
          </Form>
        </div>
      );
    } else {
      return (<Redirect to='/agenda'/>);
    }
  }

}

export default EditSchedule;