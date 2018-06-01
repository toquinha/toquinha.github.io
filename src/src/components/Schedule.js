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
        var array = [];
        performAuthenticatedRequest('https://toquinha.herokuapp.com/scheduleItem/'+moment().toJSON()+'/'+moment().add('days', 1).toJSON(), "GET")
        .then((response) => response.json()
        .then(data => ({ok: response.ok, body: data})).then(obj => {
        console.log(obj);
        this.setState({teste: {body: obj.body}})
        // if(obj.ok) {
        //     this.setState((prevState, props) =>{
        //         prevState.customers = obj.body;
        //         return prevState;
        //     });
        // } else {
        //     this.setState({shouldRedirect: true});
        // }
        }));
        this.state = {
            startDate: moment(),
            endDate: moment().add('days', 1),
            teste: {body: array}
        }
    }
    onDateChange(date) {
        this.setState(date)
        console.log(date.startDate)
        console.log(date.endDate)
        performAuthenticatedRequest('https://toquinha.herokuapp.com/scheduleItem/'+date.startDate.toJSON()+'/'+date.endDate.toJSON(), "GET")
        .then((response) => response.json()
        .then(data => ({ok: response.ok, body: data})).then(obj => {
        console.log(obj);
        this.setState({teste: {body: obj.body}})
        // if(obj.ok) {
        //     this.setState((prevState, props) =>{
        //         prevState.customers = obj.body;
        //         return prevState;
        //     });
        // } else {
        //     this.setState({shouldRedirect: true});
        // }
        }));
        // date.set({h: 11, m: 11});
        // console.log(date.toJSON());
    }
    componentDidMount() {
        
    }
    render() {
        moment.locale('pt-br');
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
                              {p.startTime}
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