import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalCard } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.auditKey);
  }

  auditKey = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.auditKey);
  }

  handleCloseModal = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleCloseModal}>
        <ModalCard>{this.props.children}</ModalCard>
      </Overlay>,
      modalRoot
    );
  }
}
