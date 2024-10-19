import React from 'react';
import './Modal.css';

const Modal = ({ showModal, onClose, children }) => {
  if (!showModal) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-container" onClick={handleOverlayClick}>
      <div className="content">
        {children}
      </div>
    </div>
  );
};
export default Modal;