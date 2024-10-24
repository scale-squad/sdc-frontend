import React, {useState, useEffect} from 'react';


const ProductThumbnail = ({photo, index, currentPhotoIndex, setCurrentPhotoIndex, isExpanded}) =>{


  function thumbnailClicked(){
      setCurrentPhotoIndex(index);
  }


  return (
    <div className="thumbnail-gallary" tabIndex="0">
      <img src={photo.thumbnail_url} onClick={thumbnailClicked}/>

      {currentPhotoIndex===index && !isExpanded ?
        <div className="selectedThumbnail"></div>
      : ""}


    </div>
  )

}

export default ProductThumbnail;