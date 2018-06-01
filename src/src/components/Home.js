import React from 'react';
import { Redirect } from 'react-router-dom';
import { performAuthenticatedRequest } from '../helper/RequestHelper'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect : false
    }
    performAuthenticatedRequest('https://toquinha.herokuapp.com/', "GET").then(results => {
      this.setState({shouldRedirect : !results.ok})
    }).catch(error => {
      this.setState({shouldRedirect : true})
    });
  }
  componentDidMount() {
    
  }
  render() {
    if (!this.state.shouldRedirect){
      return (
        <div>
          <h1> Bem - vindo à toquinha da cuca! </h1>
        </div>
      );
    } else {
        return (<Redirect to='/login' />);
    }
  }
}

  export default Home;