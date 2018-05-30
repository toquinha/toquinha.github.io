import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import {submitAuthenticatedForm} from '../helper/RequestHelper'
import { performAuthenticatedRequest } from '../helper/RequestHelper'
import Autosuggest from 'react-bootstrap-autosuggest'


class EditPet extends React.Component {
    constructor(props) {
        super(props);
        const { match: { params : { petId }} } = this.props;
        this.state = {
            formsDisabled : false,
            id: petId,
            name : "",
            breed: "",
            age: "",
            owner: {name: "", id: ""},
            shouldRedirect: false,
            customers: [],
            mapClientId: []
        }
    }
    componentDidMount() {
        const { match: { params : { petId }} } = this.props;
        console.log(petId);
        this.setState({formsDisabled : petId !== undefined});
        if (petId !== undefined) {
            performAuthenticatedRequest("http://localhost:8080/pet/"+petId, "GET").then(results => {return results.json();}).then(data => {
                this.setState(data);
            });
        }
        performAuthenticatedRequest('http://localhost:8080/shortCustomer', "GET").then(results => {return results.json();}).then(data => {
          console.log(data);
          this.setState({customers: data});
        });
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state[event.target.name]);
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state));
        submitAuthenticatedForm("http://localhost:8080/pet", this.state)
        .then((response) => { if (response.ok) {
            console.log("foi");
            this.setState({shouldRedirect: true});
        } });
    }
    onSelectChange(obj) {
        console.log(obj);
    }
    onSelect(obj) {
        console.log(obj)
        if(obj != null) {
            this.setState({owner: obj})
        }
    }
    render() {
        if (!this.state.shouldRedirect) {
        return(
            <div className ="container">
            <h1>Dados do pet</h1>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="formHorizontalName">
                    <Col componentClass={ControlLabel} sm={2}>
                    Nome
                    </Col>
                    <Col sm={10}>
                    <FormControl name="name" disabled={this.state.formsDisabled} onChange = {this.handleChange.bind(this)} type="Text" value={this.state.name}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                Dono
                </Col>
                <Col sm={10}>
                <Autosuggest
                    datalist={this.state.customers}
                    placeholder="Selecione ou digite o nome do dono"
                    itemValuePropName="name"
                    onSelect={this.onSelect.bind(this)}
                    onChange={this.onSelectChange}
                    disabled={this.state.formsDisabled}
                    // datalistOnly
                    value={this.state.owner}
                    valueIsItem={true}
                    />
                </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalBreed">
                    <Col componentClass={ControlLabel} sm={2}>
                    Raça
                    </Col>
                    <Col sm={10}>
                    <FormControl name="breed" disabled={this.state.formsDisabled} type="text" onChange = {this.handleChange.bind(this)} value={this.state.breed} />
                    </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalAge">
                    <Col componentClass={ControlLabel} sm={2}>
                    Idade
                    </Col>
                    <Col sm={10}>
                    <FormControl name="age" disabled={this.state.formsDisabled} type="number" onChange = {this.handleChange.bind(this)} value={this.state.age}  />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button type="submit">Salvar</Button>
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

export default EditPet;