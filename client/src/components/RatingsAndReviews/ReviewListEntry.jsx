
import React from 'react';
import StarRating from '../sharedComponents/StarRating.jsx'
const ReviewListEntry = ({ review }) => {
  if (review === undefined) { return <div>Error Loading  Component</div> }
  const { summary, rating, body, date, photos, helpfulness, reviewer_name } = review;
  return (
    <div className="review-entry">
      <StarRating className="review-entry-stars" rating={rating} dimensions={15} />
      <span className="review-entry-date">{new Date(date).toDateString()}</span>
      <div className="review-entry-title">{summary}</div>
      <div className="review-entry-text">{body}</div>
      <div><span>Helpful? <a href="">Yes</a><span>{helpfulness}</span></span>|<span><a href="">Report</a></span></div>

    </div>
  )
};

export default ReviewListEntry;