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
import EditButton from "./reusable/EditButton"
import SubmitButton from "./reusable/SubmitButton"
import MaskedFormControl from 'react-bootstrap-maskedinput'
import moment from 'moment';

class EditPet extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: {
          petId
        }
      }
    } = this.props;
    this.state = {
      formsDisabled: false,
      id: petId,
      name: "",
      breed: "",
      birthDay: moment().subtract(10, "years"),
      owner: {
        name: "",
        id: ""
      },
      notes: "",
      shouldRedirect: false,
      customers: [],
      mapClientId: []
    }
  }
  componentDidMount() {
    const {
      match: {
        params: {
          petId
        }
      }
    } = this.props;
    console.log(petId);
    this.setState({
      formsDisabled: petId !== undefined
    });
    if (petId !== undefined) {
      performAuthenticatedRequest("pet/" + petId, "GET").then(results => {
        return results.json();
      }).then(data => {
        data.birthDay = moment
          .utc(data.birthDay)
          .local();
        this.setState(data);
      });
    }
    performAuthenticatedRequest('shortCustomer', "GET").then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      this.setState({customers: data});
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state[event.target.name]);
  }
  handleBirthDayChange(event) {
    var regex = /^[0-9]{2}[\/\-][0-9]{2}[\/\-]\d{4}$/;
    if (regex.test(event.target.value)) {
      this.setState({
        birthDay: moment(event.target.value, "DD/MM/YYYY")
      })
      console.log(moment(event.target.value, "DD/MM/YYYY"))
    }
  }
  validateBirthDay() {
    var regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
    if (regex.test(this.state.birthDay.format("DD/MM/YYYY")) 
        || "" === this.state.birthDay.format("DD/MM/YYYY")){
      return null;
    }
    return 'error';
  }
  handleSubmit(event) {
    event.preventDefault();
    if(this.validateBirthDay() === 'error') {
      alert("Data de nascimento inválida");
    }
    console.log(JSON.stringify(this.state));
    submitAuthenticatedForm("pet", this.state).then((response) => {
      if (response.ok) {
        console.log("foi");
        this.setState({shouldRedirect: true});
      }
    });
  }
  onSelectChange(obj) {
    console.log(obj);
  }
  onSelect(obj) {
    console.log(obj)
    if (obj != null) {
      this.setState({owner: obj})
    }
  }
  enableEdit() {
    this.setState({formsDisabled: false});
  }
  render() {
    if (!this.state.shouldRedirect) {
      return (
        <div className="container">
          <h1>Dados do pet</h1>
          <Form
            horizontal
            onSubmit={this
            .handleSubmit
            .bind(this)}>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                Nome
              </Col>
              <Col sm={10}>
                <FormControl
                  name="name"
                  required
                  disabled={this.state.formsDisabled}
                  onChange={this
                  .handleChange
                  .bind(this)}
                  type="Text"
                  value={this.state.name}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <Col componentClass={ControlLabel} sm={2}>
                Dono
              </Col>
              <Col sm={10}>
                <Autosuggest datalist={this.state.customers} placeholder="Selecione ou digite o nome do dono" itemValuePropName="name" onSelect={this
                  .onSelect
                  .bind(this)} onChange={this.onSelectChange} disabled={this.state.formsDisabled} // datalistOnly
                  value={this.state.owner} valueIsItem={true} required/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalBreed">
              <Col componentClass={ControlLabel} sm={2}>
                Raça
              </Col>
              <Col sm={10}>
                <FormControl
                  name="breed"
                  disabled={this.state.formsDisabled}
                  type="text"
                  required
                  onChange={this
                  .handleChange
                  .bind(this)}
                  value={this.state.breed}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalAge" validationState={this.validateBirthDay()}>
              <Col componentClass={ControlLabel} sm={2}>
                Data de nascimento
              </Col>
              <Col sm={10}>
                <MaskedFormControl
                  name="birthDay"
                  disabled={this.state.formsDisabled}
                  type="text"
                  mask="11/11/1111"
                  onChange={this
                  .handleBirthDayChange
                  .bind(this)}
                  value={this
                  .state
                  .birthDay
                  .format("DD/MM/YYYY")}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <Col componentClass={ControlLabel} sm={2}>Observações</Col>
              <Col sm={10}>
                <FormControl
                  name="notes"
                  value={this.state.notes === null? "" : this.state.notes}
                  componentClass="textarea"
                  disabled={this.state.formsDisabled}
                  rows={5}
                  onChange={this
                  .handleChange
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
      )
    } else {
      return (<Redirect to='/pets'/>);
    }
  }
}

export default EditPet;