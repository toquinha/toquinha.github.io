import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Customer from './Customer'
import Pet from './Pet'
import EditCustomer from './EditCustomer'

class Main extends React.Component {
    render() {
      return (
        <main>
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/clientes' component={Customer}/>
            <Route path='/pets' component={Pet}/>
            <Route path = '/editCustomer/:customerId?' component={EditCustomer}/>
            </Switch>
        </main>
      );
    }
  }

  export default Main;