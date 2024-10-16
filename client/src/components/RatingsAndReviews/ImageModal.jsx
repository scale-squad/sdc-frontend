
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
    const modalBackground = document.getElementById('modal-fullscreen');
    const modalImage = document.getElementById('modal-image');
    const modalCloseButton = document.getElementById('modal-close-button');
    modalImage.innerHTML = `<img src=${img}>`;
    modalBackground.style.display = "flex";
    modalImage.style.display = "flex";
    modalCloseButton.style.display = "flex";
  }

  const createModalBackgroundIfNone = () => {
    const modalBackground = document.getElementById('modal-fullscreen');
    if (!modalBackground) {
      const body = document.body;
      let modalDiv = document.createElement('div');
      let modalCloseButton = document.createElement('div');
      let modalImage = document.createElement('div');
      modalCloseButton.setAttribute('id', 'modal-close-button');
      modalCloseButton.append('𝕩');
      modalDiv.setAttribute('id', 'modal-fullscreen');
      modalImage.setAttribute('id', 'modal-image');
      modalCloseButton.addEventListener('click',handleModalClose);
      modalDiv.append(modalCloseButton);
      modalDiv.append(modalImage);
      body.prepend(modalDiv);
    }
  }
  createModalBackgroundIfNone();
  const style = {width:dimensions};
  return (
    <span>
      <span className="modal-thumbnail">
        <img onClick={() => showModal(imageUrl)} src={imageUrl} alt="image thumbnail" style={style}></img>
      </span>
    </span >
  )
};

export default ImageModal;