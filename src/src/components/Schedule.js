import React from 'react';
import {SingleDatePicker} from 'react-dates';
import {performAuthenticatedRequest} from '../helper/RequestHelper'
import moment from 'moment';
import 'moment/min/locales';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import BigCalendar from 'react-big-calendar'
import { Redirect } from 'react-router-dom';


BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class Schedule extends React.Component {
  constructor() {
    super();
    moment.locale('pt-br');
    var array = [];
    this.state = {
      selectedEventId: null,
      shouldRedirect: false,
      startDate: moment(),
      endDate: moment().add(1, 'days'),
      teste: {
        body: array
      },
      events: [
        {
          id: 0,
          title: 'All Day Event very long title',
          start: moment()
            .subtract(3, 'hours')
            .toDate(),
          end: moment()
            .add(1, 'hours')
            .toDate()
        }, {
          id: 0,
          title: 'All Day Event very long title',
          start: moment()
            .subtract(3, 'hours')
            .toDate(),
          end: moment()
            .add(1, 'hours')
            .toDate()
        }
      ],
      selectedDate: moment().toDate()
    }
    console.log(moment().format())
    console.log(moment.utc().toJSON())
  }
  onDateChange(date) {
    this.setState({startDate: date});
    console.log(date);
    this.updateList(date);
  }
  convertDateFormat(dateArray) {
    return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0] + " " + dateArray[3] + ":" + dateArray[4];
  }
  componentDidMount() {
    this.updateList(this.state.startDate);
  }
  updateList(startDate) {
    performAuthenticatedRequest('http://localhost:8080/scheduleItemMonth/' + startDate.format(), "GET").then((response) => response.json().then(data => ({ok: response.ok, body: data})).then(obj => {
      console.log(obj);
      this.setState({
        teste: {
          body: obj.body
        }
      });
      var eventsArray = obj
        .body
        .map(item => ({
          id: item.id,
          title: item.pet.name + " (" + item.type + ")",
          start: moment
            .utc(item.startTime)
            .local()
            .toDate(),
          end: moment
            .utc(item.endTime)
            .local()
            .toDate()
        }));
      this.setState({events: eventsArray});
      console.log("eventos");
      console.log(eventsArray)
    }));
  } 
  render() {
    if(this.state.selectedEventId !== null) {
      return(<Redirect to={'/editSchedule/'+this.state.selectedEventId}/>)
    }
    else if (!this.state.shouldRedirect) {
      return (
        <div className="container">
          <Link to='/editSchedule'>
            <Button bsStyle="primary">Novo agendamento</Button>
          </Link>
          <h3>
            Escolha uma data para exibir no calendário:
          </h3>
          <div className="calendar">
            <SingleDatePicker date={this.state.startDate} // momentPropTypes.momentObj or null
              onDateChange={this
              .onDateChange
              .bind(this)} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
              id="your_unique_id" // PropTypes.string.isRequired,
            />

            <BigCalendar
              events={this.state.events}
              defaultView="week"
              toolbar={false}
              scrollToTime={new Date()}
              onNavigate={date => {
              this.setState({startDate: moment(date)});
              this
                .updateList
                .bind(this)(moment(date));
              console.log(date);
            }}
              date={this
              .state
              .startDate
              .toDate()}
              onSelectEvent={event => this.setState({selectedEventId: event.id})}
              onSelectSlot={slotInfo => alert(`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` + `\nend: ${slotInfo.end.toLocaleString()}` + `\naction: ${slotInfo.action}`)}/>
          </div>
        </div>
      );
    } else {
      return (<Redirect to='/login'/>);
    }
  }

}

export default Schedule;