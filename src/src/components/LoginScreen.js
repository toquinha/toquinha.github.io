import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
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
        fetch("https://toquinha.herokuapp.com/oauth/token?username="+this.state.email+"&password="+this.state.password+"&grant_type=password", {
            method: 'POST',
            headers: new Headers( {
            'Authorization': 'Basic ' + btoa("tqinhadacuca:tqinhadacuca"),
            })
        }).then((response) => response.json().then(data => ({ok: response.ok, body: data})).then(obj => {
            if(obj.ok) {
                localStorage.setItem("token", obj.body.access_token);
                this.setState({shouldRedirect: true});
            }
        }));
    }
    render() {
        const { match: { params } } = this.props;
        if (!this.state.shouldRedirect) {
        return(
            <div className ="container">
            <h1>Login{params.customerId}</h1>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                    Email
                    </Col>
                    <Col sm={10}>
                    <FormControl name="email" onChange = {this.handleChange.bind(this)} type="email" value={this.state.email}/>
                    </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                    Senha
                    </Col>
                    <Col sm={10}>
                    <FormControl name="password" type="password" onChange = {this.handleChange.bind(this)}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                    <Button type="submit">Login</Button>
                    </Col>
                </FormGroup>
                </Form>
            </div>
        )}
        else {
            return (<Redirect to='/' />);
        }
    }
}

export default LoginScreen;