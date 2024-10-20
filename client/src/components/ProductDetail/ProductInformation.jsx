import React, { useState, useEffect } from "react";

import StarRating from '../sharedComponents/StarRating.jsx'


const ProductInformation = ({currentProductStyle, product, reviews}) => {
  if(product === undefined){return <div>Error loading product</div>}
  if(currentProductStyle===undefined){return <div>Error loading current style</div>}
  if(reviews===undefined){return <div>Error loading reviews</div>}

  const [selectedStyle, setSelectedStyle] = useState();

  useEffect(()=>{
    setSelectedStyle(currentProductStyle);
  }, [currentProductStyle])


  function calcPrice(){
    if(!selectedStyle) {
      return null;
    }

    if(selectedStyle.sale_price === null) {
      return <>${selectedStyle.original_price}</>
    } else {
      return (
        <>
          ${selectedStyle.sale_price}
          {'  '}
          <s>${selectedStyle.original_price}</s>
        </>
      )
    }
  }

  return (
    <div>
      <StarRating ratingList={reviews}/>
      <h4>{product?.category.toUpperCase()}</h4>
      <h1>{product?.name}</h1>
      <h4>{calcPrice()}</h4>
    </div>
  )
};

export default ProductInformation;