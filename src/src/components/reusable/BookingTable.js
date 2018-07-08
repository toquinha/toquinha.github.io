import React from 'react';
import {Table} from 'react-bootstrap';
import moment from 'moment';
import {Link} from 'react-router-dom';

class BookingTable extends React.Component {
  constructor(){
    super();
    this.timeFormat = "DD/MM/YYYY HH:MM:SS";
  }
  render() {
    if (this.props.array.length == 0) {
      return (
        <div>
          <h3>{this.props.title}</h3>
          <div className="reservationEmpty">
            {this.props.message}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h2>{this.props.title}</h2>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Nome do pet</th>
                <th>Hora de entrada</th>
                <th>Hora de saída</th>
              </tr>
            </thead>
            <tbody>
              {this
                .props
                .array
                .map(booking => {
                  return (
                    <tr key={booking.id}>
                      <td>
                        <Link to={"/editBooking/" + booking.id}>
                          {booking.pet.name}
                        </Link>
                      </td>
                      <td>{moment
                          .utc(booking.checkinTime)
                          .local()
                          .format(this.timeFormat)}</td>
                      <td>{moment
                          .utc(booking.checkoutTime)
                          .local()
                          .format(this.timeFormat)}</td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default BookingTable;