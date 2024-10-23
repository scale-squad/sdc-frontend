import React from 'react';
const Modal = ({ showModal, onClose, className = 'content', modalClassName = 'modal-container', children }) => {
  if (!showModal) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={modalClassName} onClick={handleOverlayClick}>
      <div className={className}>
        {children}
        {modalClassName !== 'modal-container' ?
          <button className='modal-close-button' onClick={onClose}>
            X
          </button> : ""
        }
      </div>
    </div>
  );
};
export default Modal;