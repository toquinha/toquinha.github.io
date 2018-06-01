import React from 'react';
import { Button } from 'react-bootstrap';

class EditButton extends React.Component {
    render() {
        if(this.props.show) {
            return(<Button onClick={this.props.onClick}>Editar</Button>);
        } else {
            return null;
        }
    }
}

export default EditButton;