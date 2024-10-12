import StarRating from '../sharedComponents/StarRating.jsx';
import RatingGraph from './RatingGraph.jsx';
import React from 'react';
const productBreakdown = ({ size, comfort }) => {
  return (
    <div className="rating-breakdown">
      <h1 className="ratings-and-reviews-heading">Rating & Reviews</h1>
      <div>
        <StarRating rating={rating} dimensions={15} enableText={true} />
      </div>
      <div class="reviewer-recommendation-percent">
        100% of reviews recommend this product!
      </div>
      <RatingGraph ratings={ratings} />
    </div>
  )
};
export default productBreakdown;