
import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';

const ReviewList = ({ reviewList }) => {
  if (ReviewList === undefined) { return <div>Error Loading Component</div> }
  return (
    <div>{
      reviewList.map(review => <ReviewListEntry review={review} />)}
    </div>
  )
};

export default ReviewList;