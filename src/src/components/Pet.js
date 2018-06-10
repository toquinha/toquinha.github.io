import React from 'react';
import {Table, Button} from 'react-bootstrap';
import {performAuthenticatedRequest} from '../helper/RequestHelper'
import {Link} from 'react-router-dom';
import moment from 'moment';
import {getAgeText} from '../helper/AgeHelper'

class Pet extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      pets: []
    }
  }
  componentDidMount() {
    performAuthenticatedRequest('https://toquinha.herokuapp.com/customer', "GET").then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      this.setState((prevState, props) => {
        prevState.customers = data;
        return prevState;
      });
    });
    performAuthenticatedRequest('https://toquinha.herokuapp.com/pet', "GET").then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      this.setState({pets: data});
    });
    console.log(this.state.customers)
    console.log(this.state.pets)
  }
  render() {
    return (
      <div className="container">
        <h1>
          Pets:
        </h1>
        <div className="buttonDiv">
          <Link to='/editPet'>
            <Button bsStyle="primary">Novo Pet</Button>
          </Link>
        </div>
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
                      {getAgeText(p.birthDay)}
                    </td>
                    <td>
                      {p.breed}
                    </td>
                    <td>
                      {p.owner.name}
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