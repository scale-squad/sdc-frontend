import React, { useEffect, useState } from "react";


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
            <img
              alt="product_thumbnail"
              className="style-image"
              key={index}
              src={style.photos[0].thumbnail_url}
              onClick={() => styleClicked(index)}
            />

            {style.style_id === currentProductStyle.style_id ? (
              <div className="checkIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  size={24}
                  color="black"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
                </svg>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StyleSelector;