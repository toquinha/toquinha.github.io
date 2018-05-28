import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Customer from './Customer'
import Pet from './Pet'
import EditCustomer from './EditCustomer'
import EditPet from './EditPet'
import LoginScreen from './LoginScreen'
import Schedule from './Schedule'

class Main extends React.Component {
    render() {
      return (
        <main>
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/clientes' component={Customer}/>
            <Route path='/pets' component={Pet}/>
            <Route path = '/editCustomer/:customerId?' component={EditCustomer}/>
            <Route path = '/editPet/:petId?' component={EditPet}/>
            <Route path = '/login' component={LoginScreen}/>
            <Route path = '/agenda' component={Schedule}/>
            </Switch>
        </main>
      );
    }
  }

  export default Main;