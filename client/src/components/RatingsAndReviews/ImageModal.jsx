
import React,{useState} from 'react';
import Modal from '../../components/sharedComponents/Modal.jsx';
const ImageModal = ({ imageUrl, dimensions = 50 }) => {
  if (imageUrl === undefined) { return <div>N/A image</div> }

  const [showImage,setShowImage]=useState(false);

  const style = { width: dimensions };

  return (<div>
    <Modal modalClassName='rr-modal-fullscreen' className='rr-modal-fullscreen-image' showModal={showImage} onClose={() => setShowImage(false)}>
      <img src={imageUrl}/>
    </Modal>
    <span className="modal-thumbnail">
      <img onClick={() => setShowImage(true)} src={imageUrl} alt="image thumbnail" style={style}></img>
    </span></div>
  )
};

export default ImageModal;