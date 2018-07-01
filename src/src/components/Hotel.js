import React from 'react';
import moment from 'moment';
import {Redirect} from 'react-router-dom';
import {SingleDatePicker} from 'react-dates';
import { performAuthenticatedRequest } from '../helper/RequestHelper';
import BookingTable from './reusable/BookingTable'

class Hotel extends React.Component {
  constructor() {
    super();
    moment.locale('pt-br');
    this.state = {
      checkin: [],
      checkout: [],
      current: [],
      date: moment(),
      shouldRedirect: false
    }
  }

  componentDidMount() {
    this.updateBookings(this.state.date)
  }

  updateBookings(date){
    performAuthenticatedRequest('booking/' + date.toJSON())
    .then((response) => response.json().then(data => ({ok: response.ok, body: data})).then(obj => {
      console.log(obj);
      this.setState({date:date});
      this.setState(obj.body);
    }))
  }

  render() {
    if (!this.state.shouldRedirect) {
      return (
        <div className="container">
          <h1>
            Hotelzinho
          </h1>
          <SingleDatePicker date={this.state.date} // momentPropTypes.momentObj or null
              focused={this.state.focused} // PropTypes.bool
              onDateChange={this.updateBookings.bind(this)}
              onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
              id="your_unique_id" // PropTypes.string.isRequired,
              isOutsideRange={() => {return false;}}
              numberOfMonths={1}
              readOnly
            />

            <BookingTable title="Checkin Hoje" array={this.state.checkin}/>
            <BookingTable title="Checkout Hoje" array={this.state.checkout}/>
            <BookingTable title="Demais Hóspedes" array={this.state.current}/>
        </div>
      )
    } else {
      return (<Redirect to='/login'/>);
    }
  }

}

export default Hotel;