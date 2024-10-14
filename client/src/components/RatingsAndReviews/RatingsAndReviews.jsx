
import React, { useEffect, useState } from 'react';
import ReviewList from './ReviewList.jsx';
import './RatingAndReviews.css';
import RatingBreakdown from './RatingBreakdown.jsx';
import SizeComfort from './SizeComfort.jsx';
import { sampleReview, sampleMeta } from './sampleData.js';
import axios from 'axios';

const RatingsAndReviews = ({ productId }) => {
  if (productId === undefined) { return <div>Error Loading Component</div> }

  let { ratings, characteristics, recommended } = sampleMeta;

  let reviewList = sampleReview.results;
  //for handling scaling
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  /*useEffect(() => {
    axios.get('/reviews').
  }, []);*/
  return (
    <div className="ratings-and-review-container">
      <div>
        <RatingBreakdown ratings={ratings} recommended={recommended} width={width} />
        <SizeComfort characteristics={characteristics} width={width * .9} />
      </div>
      <div>
        <ReviewList reviewList={reviewList} recommended={recommended} productId={productId}/>
      </div>
    </div>
  )
};

export default RatingsAndReviews;