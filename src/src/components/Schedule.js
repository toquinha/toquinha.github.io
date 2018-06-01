import React from 'react';
import { DateRangePicker } from 'react-dates';
import { performAuthenticatedRequest } from '../helper/RequestHelper'
import moment from 'moment';
import 'moment/min/locales';
import { Table, Button } from 'react-bootstrap';
import { Link  } from 'react-router-dom';

class Schedule extends React.Component {
    constructor() {
        super();
        moment.locale('pt-br');
        var array = [];
        this.state = {
            startDate: moment(),
            endDate: moment().add(1, 'days'),
            teste: {body: array}
        }
    }
    onDateChange(date) {
        this.setState(date)
        console.log(date.startDate)
        console.log(date.endDate)
        if (date.startDate != null && date.endDate != null) {
            performAuthenticatedRequest('https://toquinha.herokuapp.com/scheduleItem/'+date.startDate.utc().toJSON()+'/'+date.endDate.utc().toJSON(), "GET")
            .then((response) => response.json()
            .then(data => ({ok: response.ok, body: data})).then(obj => {
            console.log(obj);
            this.setState({teste: {body: obj.body}})
            }));
        }
    }
    convertDateFormat(dateArray) {
        return dateArray[2]+"/"+dateArray[1]+"/"+dateArray[0]+" "+dateArray[3]+":"+dateArray[4];
    }
    componentDidMount() {
        performAuthenticatedRequest('https://toquinha.herokuapp.com/scheduleItem/'+this.state.startDate.utc().set({hours : 0}).toJSON()+'/'+this.state.endDate.utc().toJSON(), "GET")
        .then((response) => response.json()
        .then(data => ({ok: response.ok, body: data})).then(obj => {
        console.log(obj);
        this.setState({teste: {body: obj.body}})
        }));
    }
    render() {
        
        return (
        <div className="container">
        <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={this.onDateChange.bind(this)} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            isOutsideRange={() => false}
          /> 
          <Table striped bordered condensed hover>
          <thead>
              <tr>
              <th>Data</th>
              <th>Pet</th>
              <th>Tipo</th>
              </tr>
          </thead>
            <tbody>
              {
                  this.state.teste.body.map(p => { return (
                      <tr key= {p.id}>
                          <td>
                              {this.convertDateFormat(p.startTime)}
                          </td>
                          <td>
                            <Link to={'/editPet/'+p.pet.id}> {p.pet.name} </Link>
                          </td>
                          <td>
                            {p.type}
                          </td>
                      </tr>
                  ) 
                  })
              }
          </tbody>
        </Table>
          </div>);
    }

}

export default Schedule;