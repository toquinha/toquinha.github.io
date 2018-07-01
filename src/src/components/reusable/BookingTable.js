import React from 'react';
import {Table} from 'react-bootstrap';
import moment from 'moment';

class BookingTable extends React.Component {
  render() {
    if (this.props.array.length == 0) {
      return (
        <div>
        <h2>{this.props.title}</h2>
        <h3>
          Não há reservas
        </h3>
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
                      <td>{booking.pet.name}</td>
                      <td>{moment
                          .utc(booking.checkinTime)
                          .local()
                          .format()}</td>
                      <td>{moment
                          .utc(booking.checkoutTime)
                          .local()
                          .format()}</td>
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