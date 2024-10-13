import StarRating from '../sharedComponents/StarRating.jsx';
import RatingGraph from './RatingGraph.jsx';
import React from 'react';
const RatingBreakdown = ({ ratings ,width}) => {
  const totalReveiws = Object.values(ratings).reduce((sum,x)=>sum+Number(x),0)
  const recommendedReviews = Number(ratings[5])+Number(ratings[4]);
  const recommendPercentage = recommendedReviews/totalReveiws;
  if (ratings === undefined) { return <div>Error displaying Component</div> };
  console.log(width);
  return (
    <div className="rating-breakdown">
      <h1 className="ratings-and-reviews-heading">Rating & Reviews</h1>
      <StarRating ratingList={ratings} dimensions={15} enableText={true} />
      <div className="reviewer-recommendation-percent">
        {Math.round(recommendPercentage*100)}% of reviews recommend this product!
      </div>
      <RatingGraph ratings={ratings} width={width/4} />
    </div>
  )
};
export default RatingBreakdown;