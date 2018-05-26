import React from 'react';
import { Table } from 'react-bootstrap';
import { performAuthenticatedRequest } from '../helper/RequestHelper'

class Pet extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      pets: [],
      mapClientId: []
    }
  }
  componentDidMount() {
    performAuthenticatedRequest('http://localhost:8080/customer', "GET").then(results => {return results.json();}).then(data => {
      console.log(data);
      this.setState((prevState, props) =>{
          prevState.customers = data;
          return prevState;
      });
      data.map((c) => {this.setState((prevState, props)=> {
        prevState.mapClientId[c.id] = c.name;
        return prevState;
      });
      return c;
    });
    });
      performAuthenticatedRequest('http://localhost:8080/pet', "GET").then(results => {return results.json();}).then(data => {
      console.log(data);
      this.setState({pets : data});
    });
    console.log(this.state.mapClientId)
    console.log(this.state.customers)
    console.log(this.state.pets)
  }

  render() {
    return (
      <div class="container">
          <h1> Pets: </h1>
          <Table striped bordered condensed hover>
          <thead>
              <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Raça</th>
              <th>Dono</th>
              </tr>
          </thead>
            <tbody>
              {
                  this.state.pets.map(p => { return (
                      <tr>
                          <td>
                              {p.name}
                          </td>
                          <td>
                              {p.age}
                          </td>
                          <td>
                             {p.breed}
                          </td>
                          <td>
                            {this.state.mapClientId[p.ownerId]}
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

  export default Pet;