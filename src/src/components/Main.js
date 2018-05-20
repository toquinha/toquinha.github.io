import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Customer from './Customer'
import Pet from './Pet'

class Main extends React.Component {
    render() {
      return (
        <main>
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/clientes' component={Customer}/>
            <Route path='/pets' component={Pet}/>
            </Switch>
        </main>
      );
    }
  }

  export default Main;