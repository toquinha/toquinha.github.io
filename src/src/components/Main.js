import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Customer from './Customer'
import Pet from './Pet'
import EditCustomer from './EditCustomer'
import EditPet from './EditPet'
import LoginScreen from './LoginScreen'
import Schedule from './Schedule'
import EditSchedule from './EditSchedule'
import Hotel from './Hotel'
import EditBooking from './EditBooking'

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
            <Route path = '/editSchedule/:scheduleId?' component={EditSchedule}/>
            <Route path = '/hotel' component={Hotel}/>
            <Route path = '/editBooking/:bookingId?' component={EditBooking}/>
            </Switch>
        </main>
      );
    }
  }

  export default Main;