import React from 'react';
import {Redirect} from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Modal
} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {submitAuthenticatedForm} from '../helper/RequestHelper'
import {performAuthenticatedRequest} from '../helper/RequestHelper'
import {getAgeText} from '../helper/AgeHelper'
import EditButton from "./reusable/EditButton"
import SubmitButton from "./reusable/SubmitButton"
import DeleteButton from "./reusable/DeleteButton"
import DeleteModal from "./reusable/DeleteModal"
import MaskedFormControl from 'react-bootstrap-maskedinput'

// import { Link } from 'react-router-dom';

class EditCustomer extends React.Component {

  constructor() {
    super();
    this.validationFunctions = [
      this
        .validateCellPhone
        .bind(this),
      this
        .validateCep
        .bind(this),
      this
        .validateEmail
        .bind(this),
      this
        .validateName
        .bind(this),
      this
        .validatePhone
        .bind(this)
    ]
    this.state = {
      id: null,
      name: "",
      email: "",
      phone: "",
      cellPhone: "",
      cep: "",
      address: "",
      number: 0,
      complement: "",
      state: "",
      city: "",
      shouldRedirect: false,
      formsDisabled: false,
      petsList: [],
      showModal: false
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state[event.target.name]);
  }
  test() {
    console.log("dae");
  }
  validateName() {
    var regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+ [A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/;
    if (regex.test(this.state.name)) 
      return null;
    return 'error';
  }
  validateEmail() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.email === "") {
      return null;
    }
    if (regex.test(this.state.email)) {
      return null;
    } else {
      return 'error';
    }
  }
  validateCellPhone() {
    var regex = /^\([0-9]{2}\) [0-9]{1} [0-9]{4}-[0-9]{4}/
    if (this.state.cellPhone === "" || regex.test(this.state.cellPhone)) {
      return null;
    }
    return 'error';
  }
  validatePhone() {
    var regex = /^\([0-9]{2}\) [0-9]{4}-[0-9]{4}/
    if (this.state.phone === "" || regex.test(this.state.phone)) {
      return null;
    }
    return 'error';
  }
  validateCep() {
    var regex = /^[0-9]{5}-[0-9]{3}$/;
    if (this.state.cep === "" || regex.test(this.state.cep)) {
      return null;
    }
    return 'error';
  }
  handleCepChange(event) {
    this.setState({cep: event.target.value});
    var regex = /^[0-9]{5}-[0-9]{3}$/;
    if (regex.test(event.target.value)) {
      fetch("https://viacep.com.br/ws/" + event.target.value + "/json/").then((response) => response.json().then(data => ({ok: response.ok, body: data}))).then(obj => {
        if (obj.ok) {
          this.setState({address: obj.body.logradouro, state: obj.body.uf, city: obj.body.localidade});
        }
      })
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    var validationArray = this
      .validationFunctions
      .filter(item => {
        return item() === "error";
      });
    if (validationArray.length === 0) {
      console.log(JSON.stringify(this.state));
      submitAuthenticatedForm("customer", this.state).then((response) => {
        if (response.ok) {
          console.log("foi");
          this.setState({shouldRedirect: true});
        }
      });
    } else {
      alert("Existem campos preenchidos incorretamente.");
    }
  }
  deleteRequest() {
    performAuthenticatedRequest("customer/" + this.state.id, "DELETE").then((response) => {
      if (response.ok) {
        this.setState({shouldRedirect: true});
      }
    })
  }
  componentDidMount() {
    const {
      match: {
        params: {
          customerId
        }
      }
    } = this.props;
    console.log(customerId);
    this.setState({
      formsDisabled: customerId !== undefined
    });
    if (customerId !== undefined) {
      performAuthenticatedRequest("customer/" + customerId, "GET").then(results => {
        return results.json();
      }).then(data => {
        console.log(data);
        this.setState(data);
      });
      performAuthenticatedRequest("petByOwner/" + customerId, "GET").then(results => {
        return results.json();
      }).then(data => {
        this.setState({petsList: data});
      });
    }
  }
  render() {
    const {match: {
        params
      }} = this.props;
    if (!this.state.shouldRedirect) {
      return (
        <div className="container">
          <Form
            horizontal
            onSubmit={this
            .handleSubmit
            .bind(this)}>
            <FormGroup
              controlId="formHorizontalEmail"
              validationState={this.validateName()}>
              <Col componentClass={ControlLabel} sm={2}>
                Nome
              </Col>
              <Col sm={10}>
                <FormControl
                  disabled={this.state.formsDisabled}
                  name="name"
                  required
                  autoFocus
                  onChange={this
                  .handleChange
                  .bind(this)}
                  type="Text"
                  placeholder="João da Silva"
                  value={this.state.name}/>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="formHorizontalEmail"
              validationState={this.validateEmail()}>
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl
                  disabled={this.state.formsDisabled}
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={this
                  .handleChange
                  .bind(this)}
                  value={this.state.email}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalPhone"
              validationState={this.validatePhone()}>
              <Col componentClass={ControlLabel} sm={2}>
                Telefone
              </Col>
              <Col sm={10}>
                <MaskedFormControl
                  disabled={this.state.formsDisabled}
                  name="phone"
                  type="text"
                  mask='(11) 1111-1111'
                  placeholder="(19) 3999-9999"
                  onChange={this
                  .handleChange
                  .bind(this)}
                  value={this.state.phone}/>
              </Col>
            </FormGroup>

            <FormGroup
              controlId="formHorizontalPhone"
              validationState={this.validateCellPhone()}>
              <Col componentClass={ControlLabel} sm={2}>
                Celular
              </Col>
              <Col sm={10}>
                <MaskedFormControl
                  disabled={this.state.formsDisabled}
                  name="cellPhone"
                  type="text"
                  mask='(11) 1 1111-1111'
                  placeholder="(19) 9 9999-9999"
                  onChange={this
                  .handleChange
                  .bind(this)}
                  value={this.state.cellPhone}/>
              </Col>
            </FormGroup>

            <h2>
              Endereço:
            </h2>

            <FormGroup
              controlId="formHorizontalPassword"
              validationState={this.validateCep()}>
              <Col componentClass={ControlLabel} sm={2}>
                CEP
              </Col>
              <Col sm={10}>
                <MaskedFormControl
                  name="cep"
                  disabled={this.state.formsDisabled}
                  type="text"
                  mask='11111-111'
                  value={this.state.cep}
                  onChange={this
                  .handleCepChange
                  .bind(this)}
                  placeholder="30240-230"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Logradouro
              </Col>
              <Col sm={10}>
                <FormControl
                  name="address"
                  disabled={this.state.formsDisabled}
                  type="text"
                  value={this.state.address}
                  onChange={this
                  .handleChange
                  .bind(this)}
                  placeholder="Rua da Cuca"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Número
              </Col>
              <Col sm={10}>
                <FormControl
                  disabled={this.state.formsDisabled}
                  type="number"
                  name="number"
                  value={this.state.number}
                  onChange={this
                  .handleChange
                  .bind(this)}
                  placeholder="12"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Complemento
              </Col>
              <Col sm={10}>
                <FormControl
                  name="complement"
                  disabled={this.state.formsDisabled}
                  type="text"
                  value={this.state.complement}
                  onChange={this
                  .handleChange
                  .bind(this)}
                  placeholder="Ap 2"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Estado
              </Col>
              <Col sm={10}>
                <FormControl
                  name="state"
                  disabled={this.state.formsDisabled}
                  type="text"
                  value={this.state.state}
                  onChange={this
                  .handleChange
                  .bind(this)}
                  placeholder="Minas Gerais"/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Cidade
              </Col>
              <Col sm={10}>
                <FormControl
                  name="city"
                  disabled={this.state.formsDisabled}
                  type="text"
                  onChange={this
                  .handleChange
                  .bind(this)}
                  value={this.state.city}
                  placeholder="Araguari"/>
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
          <h2>
            Pets:
          </h2>
          <Table striped bordered condensed hover>

            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Raça</th>
              </tr>
            </thead>
            <tbody>
              {this
                .state
                .petsList
                .map(p => {
                  return (
                    <tr key={p.id}>
                      <td>
                        <Link to={'/editPet/' + p.id}>
                          {p.name}
                        </Link>
                      </td>
                      <td>
                        {getAgeText(p.birthDay)}
                      </td>
                      <td>
                        {p.breed}
                      </td>
                    </tr>
                  )
                })
}
            </tbody>
          </Table>
          <DeleteModal
            showModal={this.state.showModal}
            onClick={() => {
            this.setState({showModal: false})
          }}
            onDelete={this
            .deleteRequest
            .bind(this)}/>
        </div>
      )
    } else {
      return (<Redirect to='/clientes'/>);
    }
  }
}

export default EditCustomer;