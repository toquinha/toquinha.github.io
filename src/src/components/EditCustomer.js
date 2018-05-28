import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import {submitAuthenticatedForm} from '../helper/RequestHelper'
// import { Link } from 'react-router-dom';

class EditCustomer extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            phone: "",
            shouldRedirect: false
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state[event.target.name]);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state));
        submitAuthenticatedForm("http://localhost:8080/customer", this.state)
        .then((response) => { if (response.ok) {
            console.log("foi");
            this.setState({shouldRedirect: true});
        } });
    }
    render() {
        const { match: { params } } = this.props;
        if (!this.state.shouldRedirect) {
        return(
            <div className ="container">
            <h1>Dados do cliente {params.customerId}</h1>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                    Nome
                    </Col>
                    <Col sm={10}>
                    <FormControl name="name" onChange = {this.handleChange.bind(this)} type="Text" placeholder="João da Silva" value={this.state.name}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                    Email
                    </Col>
                    <Col sm={10}>
                    <FormControl name="email" type="email" placeholder="Email" onChange = {this.handleChange.bind(this)} value={this.state.email}/>
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPhone">
                    <Col componentClass={ControlLabel} sm={2}>
                    Telefone
                    </Col>
                    <Col sm={10}>
                    <FormControl name="phone" type="text" placeholder="(19) 9 9999-9999" onChange = {this.handleChange.bind(this) } value={this.state.phone} />
                    </Col>
                </FormGroup>

                <h2> Endereço: </h2>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    CEP
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" placeholder="30240-230" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    Logradouro
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" placeholder="Rua da Cuca" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    Número
                    </Col>
                    <Col sm={10}>
                    <FormControl type="number" placeholder="12" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    Complemento
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" placeholder="Ap 2" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    Estado
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" placeholder="Minas Gerais" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    Cidade
                    </Col>
                    <Col sm={10}>
                    <FormControl type="text" placeholder="Araguari" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button type="submit">Sign in</Button>
                    </Col>
                </FormGroup>
                </Form>;
            </div>
        )}
        else {
            return (<Redirect to='/clientes' />);
        }
    }
}

export default EditCustomer;