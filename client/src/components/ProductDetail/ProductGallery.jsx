import React, { useState, useEffect, useCallback } from "react";
import ProductThumbnail from './ProductThumbnail.jsx';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdExpand } from "react-icons/io";


const ProductGallery = ({currentProductStyle, setCurrentPhotoIndex, currentPhotoIndex, isExpanded, setIsExpanded}) => {
  if(currentProductStyle === undefined){return <div>Error fetching current product style for gallery</div>}

  const [mousePosition, setMousePosition] = useState();

  const expand = useCallback(()=>{
    setIsExpanded(!isExpanded);

  }, [isExpanded])

  const increment = useCallback(()=>{
    setCurrentPhotoIndex(currentPhotoIndex + 1);
  }, [currentPhotoIndex])


  const decrement = useCallback(()=>{
      setCurrentPhotoIndex(currentPhotoIndex - 1);
  }, [currentPhotoIndex])


  const hoverhandler = (e) => {
    if(!isExpanded) {
      return;
    }
    const image = document.getElementById("productImage");

    if(!image){
      return;
    }

    let rect = image.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    let bgPosX = (mouseX / rect.width * 100);
    let bgPosY = (mouseY / rect.height * 100);

    image.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;

  }


  return (
    <div className="gallery-container ">
      <div className="mainImage"  >
      <button id="expandButton" onClick={expand}><IoMdExpand /></button>

        {currentPhotoIndex !== 0 && !isExpanded ?
          <button id="mainImageLeftButton" onClick={decrement}><FaArrowLeft/></button>
        : ""}

        <div id="productImage"
          style={
            {backgroundImage: `url(${currentProductStyle.photos[currentPhotoIndex]?.url})`,
            height:"100%",
            width:"100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: isExpanded ? '250%' : 'cover'}}
            onClick={expand} onMouseMove={hoverhandler} >

        </div>


        {currentPhotoIndex < currentProductStyle.photos.length - 1 && !isExpanded ?
          <button id="mainImageRightButton" onClick={increment}><FaArrowRight/></button>
          : ""}

      </div>
      <div className="thumbnailDiv">
        {currentProductStyle.photos.map((photo, index)=>(
          <ProductThumbnail key={index} photo={photo} index={index} currentPhotoIndex={currentPhotoIndex} setCurrentPhotoIndex={setCurrentPhotoIndex}/>
        ))}
      </div>
    </div>
  )
};

export default ProductGallery;
