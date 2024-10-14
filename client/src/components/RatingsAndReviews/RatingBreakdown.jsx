import StarRating from '../sharedComponents/StarRating.jsx';
import RatingGraph from './RatingGraph.jsx';
import React from 'react';
const RatingBreakdown = ({ ratings, recommended, width }) => {
  if (ratings === undefined || recommended===undefined) { return <div>Error displaying Component</div> };
  const totalReviews = (Number(recommended.false) + Number(recommended.true));
  const recommendPercentage = Number(recommended.true) / totalReviews;
  return (
    <div className="rating-breakdown">
      <h1 className="ratings-and-reviews-heading">Rating & Reviews</h1>
      {width / 3 > 250 ?
        <StarRating ratingList={ratings} dimensions={15} enableText={true} /> :
        width / 3 > 150 ?
        <StarRating ratingList={ratings} dimensions={20} />:
        <StarRating ratingList={ratings} dimensions={10} />
      }
      <div className="reviewer-recommendation-percent">
        {Math.round(recommendPercentage * 100)}% of reviews recommend this product!
      </div>
      <RatingGraph ratings={ratings} width={width / 4} />
    </div>
  )
};
export default RatingBreakdown;