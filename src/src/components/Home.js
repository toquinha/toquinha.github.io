import React from 'react';
import { Redirect } from 'react-router-dom';
import { performAuthenticatedRequest } from '../helper/RequestHelper'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect : null
    }
    performAuthenticatedRequest('', "GET").then(results => {
      this.setState({shouldRedirect : !results.ok})
    }).catch(error => {
      this.setState({shouldRedirect : true})
    });
  }
  componentDidMount() {
    
  }
  render() {
    if(this.state.shouldRedirect === null) {
      return(<div><h1>Carregando</h1></div>)
    }
    else if (!this.state.shouldRedirect){
      return (
        <div>
          <img className="center" src="toquinha.png"/>
        </div>
      );
    } else {
        return (<Redirect to='/login' />);
    }
  }
}

  export default Home;