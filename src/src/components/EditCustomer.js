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
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {submitAuthenticatedForm} from '../helper/RequestHelper'
import {performAuthenticatedRequest} from '../helper/RequestHelper'
import EditButton from "./reusable/EditButton"
import SubmitButton from "./reusable/SubmitButton"

// import { Link } from 'react-router-dom';

class EditCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      phone: "",
      cep: "",
      address: "",
      number: 0,
      complement: "",
      state: "",
      city: "",
      shouldRedirect: false,
      formsDisabled: false,
      pets: []
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
  handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.state));
    submitAuthenticatedForm("http://localhost:8080/customer", this.state).then((response) => {
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
          customerId
        }
      }
    } = this.props;
    console.log(customerId);
    this.setState({
      formsDisabled: customerId !== undefined
    });
    if (customerId !== undefined) {
      performAuthenticatedRequest("http://localhost:8080/customer/" + customerId, "GET").then(results => {
        return results.json();
      }).then(data => {
        console.log(data);
        this.setState(data);
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
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Nome
              </Col>
              <Col sm={10}>
                <FormControl
                  disabled={this.state.formsDisabled}
                  name="name"
                  onChange={this
                  .handleChange
                  .bind(this)}
                  type="Text"
                  placeholder="João da Silva"
                  value={this.state.name}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
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

            <FormGroup controlId="formHorizontalPhone">
              <Col componentClass={ControlLabel} sm={2}>
                Telefone
              </Col>
              <Col sm={10}>
                <FormControl
                  disabled={this.state.formsDisabled}
                  name="phone"
                  type="text"
                  placeholder="(19) 9 9999-9999"
                  onChange={this
                  .handleChange
                  .bind(this)}
                  value={this.state.phone}/>
              </Col>
            </FormGroup>

            <h2>
              Endereço:
            </h2>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                CEP
              </Col>
              <Col sm={10}>
                <FormControl
                  name="cep"
                  disabled={this.state.formsDisabled}
                  type="text"
                  value={this.state.cep}
                  onChange={this
                  .handleChange
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
                .pets
                .map(p => {
                  return (
                    <tr key={p.id}>
                      <td>
                        <Link to={'/editPet/' + p.id}>
                          {p.name}
                        </Link>
                      </td>
                      <td>
                        {p.age}
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
        </div>
      )
    } else {
      return (<Redirect to='/clientes'/>);
    }
  }
}

export default EditCustomer;