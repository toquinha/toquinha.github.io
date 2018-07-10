import React from 'react';
import { Button } from 'react-bootstrap';

class DeleteButton extends React.Component {
    render() {
        if(this.props.show) {
            return(<Button onClick={this.props.onClick} bsStyle="danger">Deletar</Button>);
        } else {
            return null;
        }
    }
}

export default DeleteButton;