import React, { useState, useEffect } from "react";
import ProductThumbnail from './ProductThumbnail.jsx';

const ProductGallery = ({currentProductStyle, setCurrentPhotoIndex, currentPhotoIndex}) => {
  if(currentProductStyle === undefined){return <div>Error fetching current product style for gallery</div>}

  return (
    <div className="gallery-container ">
      <div className="mainImage">
        <button></button>
        <img src={currentProductStyle.photos[currentPhotoIndex].url}></img>
      </div>
      <div className="thumbnailDiv">
        {currentProductStyle.photos.map((photo, index)=>(
          <ProductThumbnail key={index} photo={photo} index={index}  setCurrentPhotoIndex={setCurrentPhotoIndex}/>
        ))}
      </div>
    </div>
  )
};

export default ProductGallery;
