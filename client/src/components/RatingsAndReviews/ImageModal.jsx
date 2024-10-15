
import React from 'react';
const ImageModal = ({ imageUrl, dimensions }) => {
  if (imageUrl === undefined) { return <div>N/A image</div> }
  const handleModalClose = () => {
    const modalBackground = document.getElementById('modal-fullscreen');
    const modalImage = document.getElementById('modal-image');
    const modalCloseButton = document.getElementById('modal-close-button');
    modalBackground.style.display = "";
    modalImage.style.display = "";
    modalCloseButton.style.display = "";
  };
  const showModal = (img) => {
    console.log(img);
    const modalBackground = document.getElementById('modal-fullscreen');
    const modalImage = document.getElementById('modal-image');
    const modalCloseButton = document.getElementById('modal-close-button');
    modalImage.innerHTML = `<img src=${img}>`;
    modalBackground.style.display = "flex";
    modalImage.style.display = "flex";
    modalCloseButton.style.display = "flex";
    console.log(modalCloseButton.style)
  }
  return (
    <span>
      <div id="modal-fullscreen">
        <div id="modal-close-button" onClick={handleModalClose}>𝕩</div>
        <div id="modal-image"></div>
      </div>

      <span className="modal-thumbnail" width={dimensions}>
        <img onClick={() => showModal(imageUrl)} src={imageUrl} alt="image thumbnail" ></img>
      </span>
    </span>
  )
};

export default ImageModal;