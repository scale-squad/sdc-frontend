import React, {useEffect, useState} from 'react';
import { CiCircleCheck } from "react-icons/ci";

const StyleSelector = ({currentProductStyle, setCurrentProductStyle, productStyles, currentPhotoIndex, setCurrentPhotoIndex}) => {

  if(currentProductStyle===undefined) {
    return <div>Error loading current product style</div>
  }
  if(productStyles===undefined) {
    return <div>Error loading product styles</div>
  }

  function styleClicked(index) {

    if(currentPhotoIndex > productStyles[index].photos.length - 1){
      setCurrentPhotoIndex(productStyles[index].photos.length - 1);
    }

    setCurrentProductStyle(productStyles[index]);
  }

  return (
    <div>
      <h4>{"STYLE > "}{currentProductStyle.name}</h4>
      <div className="style-selector">
        {productStyles.map((style, index) => (
          <div className="style-selector-image-crop" key={style.style_id}>

            <img className="style-image" key={index} src={style.photos[0].thumbnail_url} onClick={()=>styleClicked(index)} />

            {style.style_id === currentProductStyle.style_id ?
              <div className="checkIcon">
                <CiCircleCheck size={24} color="black"/>
              </div>
              : "" }
          </div>
        ))}
      </div>
    </div>
  )
}

export default StyleSelector;