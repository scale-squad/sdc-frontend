
import React from 'react';
const AddReviewModal = ({ productId }) => {
  if (productId === undefined) { return <div>Error loading component</div> }
  const handleModalClose = () => {
    const modalBackground = document.getElementById('modal-fullscreen');
    const modalImage = document.getElementById('modal-form');
    const modalCloseButton = document.getElementById('modal-close-button');
    modalBackground.style.display = "";
    modalImage.style.display = "";
    modalCloseButton.style.display = "";
  };
  const showModal = () => {
    const modalBackground = document.getElementById('modal-fullscreen');
    const modalImage = document.getElementById('modal-form');
    const modalCloseButton = document.getElementById('modal-close-button');
    modalBackground.style.display = "flex";
    modalImage.style.display = "flex";
    modalCloseButton.style.display = "flex";
  }
  return (
    <span>
      <div id="modal-fullscreen">
        <div id="modal-close-button" onClick={handleModalClose}>𝕩</div>
        <div id="modal-form"></div>
      </div>
      <button onClick={showModal}>Add Review +</button>
    </span>
  )
};

export default AddReviewModal;