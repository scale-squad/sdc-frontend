import React, {useEffect, useState} from 'react';

const StyleSelector = ({currentProductStyle, setCurrentProductStyle, productStyles, currentPhotoIndex}) => {

  if(currentProductStyle===undefined) {
    return <div>Error loading current product style</div>
  }
  if(productStyles===undefined) {
    return <div>Error loading product styles</div>
  }

  function styleClicked(index) {
    setCurrentProductStyle(productStyles[index]);
  }

  return (
    <div>
      <h4>{"STYLE > "}{currentProductStyle.name}</h4>
      <div className="style-selector">
        {productStyles.map((style, index) => (
          <div className="style-selector-image-crop">
            <img className="style-image" key={index} src={style.photos[0].thumbnail_url} onClick={()=>styleClicked(index)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default StyleSelector;