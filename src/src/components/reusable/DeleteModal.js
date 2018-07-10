import React from 'react';
import {Button, Modal} from 'react-bootstrap';

class DeleteModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.showModal}>
        <Modal.Header>
          <Modal.Title>Confirmar</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja realmente deletar?</Modal.Body>

        <Modal.Footer>
          <Button
            onClick={this.props.onClick}>Cancelar</Button>
          <Button
            bsStyle="danger"
            onClick={this.props.onDelete}>Deletar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteModal;