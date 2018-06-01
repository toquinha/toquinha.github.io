import React from 'react';
import { Button } from 'react-bootstrap';

class SubmitButton extends React.Component {
    render() {
        if(this.props.show) {
            return(<Button type="submit">Salvar</Button>);
        } else {
            return null;
        }
    }
}

export default SubmitButton;