import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductInformation from './ProductInformation.jsx';
import ProductSlogan from './ProductSlogan.jsx';
import ProductGallery from './ProductGallery.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import StarRating from '../sharedComponents/StarRating.jsx'
import './ProductDetail.css'



const ProductDetail = ({ productId, styleId, setStyleId }) => {
  if (productId === undefined) { return <div>Error loading product id</div> }
  if (styleId === undefined) { return <div>Error loading style id</div> }


  const [product, setProduct] = useState();
  const [productStyles, setProductStyles] = useState();
  const [currentProductStyle, setCurrentProductStyle] = useState();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [reviews, setReviews] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  const expandButtonClicked = () => {
    setIsExpanded(!isExpanded);

  }


  useEffect(() => {
    const result = Promise.all([
      axios.get(`products/${productId}`),
      axios.get(`/products/${productId}/styles`),
      axios.get(`/reviews/meta/`, { params: { product_id: productId } })
    ]).then(resArr=>{
      setProduct(resArr[0].data);
      setProductStyles(resArr[1].data.results);
      setCurrentProductStyle(resArr[1].data.results[0]);
      setReviews(resArr[2].data.ratings);
    }).catch(err=>{
      console.log('error in useEffect', err);
    })
  }, [productId]);


  return (
    <div className="product-wrapper">
      <div className={`first-column${isExpanded ? '-expanded' : ''}`}>


        <ProductGallery currentProductStyle={currentProductStyle} setCurrentPhotoIndex={setCurrentPhotoIndex} currentPhotoIndex={currentPhotoIndex} isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
      </div>
      {!isExpanded ?
        <div className="second-column" >
          <div>
            <ProductInformation currentProductStyle={currentProductStyle} product={product}  reviews={reviews} />
          </div>
          <div>
            <StyleSelector currentProductStyle={currentProductStyle} setCurrentProductStyle={setCurrentProductStyle} productStyles={productStyles} currentPhotoIndex={currentPhotoIndex} setCurrentPhotoIndex={setCurrentPhotoIndex}/>
          </div>
          <div>
            <AddToCart currentProductStyle={currentProductStyle} />
          </div>

        </div>
      : <div></div>}

      <div className="product-slogan">
          <ProductSlogan product={product} />
      </div>

    </div>
  )
};

export default ProductDetail;