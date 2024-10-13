
import React, { useEffect, useState } from 'react';
import ReviewList from './ReviewList.jsx';
import './RatingAndReviews.css';
import RatingBreakdown from './RatingBreakdown.jsx';
import SizeComfort from './SizeComfort.jsx';
import { sampleReview, sampleMeta } from './sampleData.js';

const RatingsAndReviews = ({ productId }) => {
  let { ratings, characteristics } = sampleMeta;
  let reviewList = sampleReview.results;
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  if (productId === undefined) { return <div>Error Loading Component</div> }
  return (
    <div className="ratings-and-review-container">
      <div>
        <RatingBreakdown ratings={ratings} width={width} />
        <SizeComfort characteristics={characteristics} width={width} />
      </div>
      <div>
        <ReviewList reviewList={reviewList} />
        <button>ADD A REVIEW  +</button>
      </div>
    </div>
  )
};

export default RatingsAndReviews;