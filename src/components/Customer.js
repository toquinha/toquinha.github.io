import React from 'react';
import { Button, Table } from 'react-bootstrap';

class Customer extends React.Component {
    constructor() {
        super();
        this.state = {
            customers: []
        }
    }
    componentDidMount() {
    fetch('http://toquinha.herokuapp.com/').then(results => {return results.json();}).then(data => {
      console.log(data);
      this.setState((prevState, props) =>{
          prevState.customers = data;
          return prevState;
      });
    });
  }
    showAlert(text){
        alert(text);
    }
    render() {
      return (
        <div class="container">
            <h1> Clientes: </h1>
            <Table striped bordered condensed hover>
            <thead>
                <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
                </tr>
            </thead>
              <tbody>
                {
                    this.state.customers.map(c => { return (
                        <tr>
                            <td>
                                {c.name}
                            </td>
                            <td>
                                {c.email}
                            </td>
                            <td>
                                <button onClick={() => this.showAlert(c.id)}>Test</button>
                                <Button onClick={() => this.showAlert(c.id)} bsStyle="primary">Primary</Button>
                            </td>
                        </tr>
                    ) 
                    })
                }
            </tbody>
          </Table>
        </div>
      );
    }
  }

  export default Customer;