import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Customer from './Customer'
import Pet from './Pet'
import EditCustomer from './EditCustomer'
import LoginScreen from './LoginScreen'

class Main extends React.Component {
    render() {
      return (
        <main>
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/clientes' component={Customer}/>
            <Route path='/pets' component={Pet}/>
            <Route path = '/editCustomer/:customerId?' component={EditCustomer}/>
            <Route path = '/login' component={LoginScreen}/>
            </Switch>
        </main>
      );
    }
  }

  export default Main;