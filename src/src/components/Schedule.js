import React from 'react';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'moment/min/locales';

class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {
            date: null,
            focused: null
        }
    }
    onDateChange(date) {
        this.setState({date});
        date.set({h: 11, m: 11});
        console.log(date);
    }
    render() {
        moment.locale('pt-br');
        return (<SingleDatePicker
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={this.onDateChange.bind(this)} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
            isOutsideRange={() => false}
          />);
    }

}

export default Schedule;