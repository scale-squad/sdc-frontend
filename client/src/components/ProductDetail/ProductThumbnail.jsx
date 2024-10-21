import React, {useState, useEffect} from 'react';


const ProductThumbnail = ({photo, index, setCurrentPhotoIndex}) =>{

  function thumbnailClicked(){
      setCurrentPhotoIndex(index);
  }


  return (
    <div className="thumbnail" tabIndex="0">
      <img src={photo.thumbnail_url} onClick={thumbnailClicked}/>
    </div>
  )

}

export default ProductThumbnail;