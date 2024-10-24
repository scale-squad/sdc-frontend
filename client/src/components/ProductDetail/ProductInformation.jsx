import React, { useState, useEffect } from "react";

import StarRating from '../sharedComponents/StarRating.jsx'
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

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
  };

  function calcTotalReviews(){
    let total = 0;
    for(const [key, value] of Object.entries(reviews)) {
      total += Number(value);
    }
    return total;
  }

  return (
    <div>
      <div className="totalReviews">
        <StarRating className="starsInProduct" ratingList={reviews} dimensions={20}/>
        <a className="link-to-reviews" href="#rating-and-reviews-module">Read all {calcTotalReviews()} reviews</a>
      </div>
      <h4>{product?.category.toUpperCase()}</h4>
      <h1>{product?.name}</h1>
      <div className="shareLogos">
        <a className="facebook" href="https://www.facebook.com"><FaFacebook /></a>
        <a className="centerLogo twitter" href="https://twitter.com"><FaXTwitter /></a>
        <a className="pinterest" href="https://www.pinterest.com"><FaPinterest /></a>
      </div>
      <h4>{calcPrice()}</h4>
    </div>
  )
};

export default ProductInformation;