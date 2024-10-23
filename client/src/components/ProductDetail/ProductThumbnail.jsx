import React, {useState, useEffect} from 'react';


const ProductThumbnail = ({photo, index, currentPhotoIndex, setCurrentPhotoIndex}) =>{

  //const [isSelected, setIsSelected] = useState(false);

  function thumbnailClicked(){
      setCurrentPhotoIndex(index);
      //setIsSelected(!isSelected);
  }


  return (
    <div className="thumbnail" tabIndex="0">
      <img src={photo.thumbnail_url} onClick={thumbnailClicked}/>

      {currentPhotoIndex===index ?
        <div id="selectedThumbnail"></div>
      : ""}
    </div>
  )

}

export default ProductThumbnail;