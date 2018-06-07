import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { performAuthenticatedRequest}  from '../helper/RequestHelper'
import { Redirect } from 'react-router-dom';

class Customer extends React.Component {
    constructor() {
        super();
        this.state = {
            customers: [],
            shouldRedirect: false
        }
    }
    componentDidMount() {
    performAuthenticatedRequest('http://localhost:8080/customer', "GET").then((response) => response.json()
    .then(data => ({ok: response.ok, body: data})).then(obj => {
      console.log(obj);
      if(obj.ok) {
        this.setState((prevState, props) =>{
            prevState.customers = obj.body;
            return prevState;
        });
      } else {
          this.setState({shouldRedirect: true});
      }
    }));
  }
    showAlert(text){
        alert(text);
    }
    render() {
      if(!this.state.shouldRedirect){
        return (
            <div className="container">
                <h1> Clientes: </h1>
                <Link to='/editCustomer'><Button bsStyle="primary">Novo cliente</Button></Link>
                <Table striped bordered condensed hover>
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.customers.map(c => { return (
                            <tr key={c.id}>
                                <td>
                                    <Link to ={'/editCustomer/'+c.id}>{c.name}</Link>
                                </td>
                                <td>
                                    {c.email}
                                </td>
                                <td>
                                    {c.phone}
                                </td>
                            </tr>
                        ) 
                        })
                    }
                </tbody>
            </Table>
            </div>
        );
        } else {
            return (<Redirect to='/login' />);
        }
    }
  }

  export default Customer;