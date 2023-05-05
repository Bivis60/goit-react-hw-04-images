import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalCard } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') closeModal();
    });
  }, [closeModal]);

  useEffect(() => {
    window.removeEventListener('keydown', event => {
      if (event.code === 'Escape') closeModal();
    });
  }, [closeModal]);

  const handleCloseModal = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleCloseModal}>
      <ModalCard>{children}</ModalCard>
    </Overlay>,
    modalRoot
  );
};
