import React, { useState, useEffect } from "react";

import StarRating from "../sharedComponents/StarRating.jsx";

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
      return <h4 className="originalPrice">${selectedStyle.original_price}</h4>
    } else {
      return (
        <h4 className="salePrice">
          ${selectedStyle.sale_price}
          {'  '}
          <s className="strikethroughPrice">${selectedStyle.original_price}</s>
        </h4>
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
        <a className="facebook" href="https://www.facebook.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.311h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.595 1.325-1.324V1.325C24 .595 23.405 0 22.675 0z" />
          </svg>
        </a>
        <a className="centerLogo twitter" href="https://twitter.com">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.897 4.897 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.92 4.92 0 004.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.935 9.935 0 0024 4.557z" />
          </svg>
        </a>
        <a className="pinterest" href="https://www.pinterest.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 4.991 3.657 9.128 8.438 10.292-.117-.875-.223-2.22.047-3.175.242-.83 1.558-5.292 1.558-5.292s-.397-.794-.397-1.969c0-1.844 1.07-3.219 2.403-3.219 1.132 0 1.678.85 1.678 1.867 0 1.138-.723 2.844-1.094 4.422-.312 1.312.663 2.381 1.969 2.381 2.363 0 4.188-2.494 4.188-6.081 0-3.175-2.281-5.397-5.547-5.397-3.781 0-6.006 2.844-6.006 5.775 0 1.138.438 2.363 1 3.031.109.125.125.234.094.359-.109.391-.359 1.25-.406 1.422-.063.234-.203.281-.469.172-1.75-.719-2.844-2.969-2.844-4.781 0-3.875 2.828-7.438 8.156-7.438 4.281 0 7.625 3.063 7.625 7.172 0 4.281-2.688 7.75-6.438 7.75-1.25 0-2.438-.656-2.844-1.406l-.781 2.969c-.281 1.094-1.031 2.469-1.531 3.312C9.75 23.875 10.875 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
          </svg>
        </a>
      </div>
      <div>{calcPrice()}</div>
    </div>
  );
};

export default ProductInformation;
