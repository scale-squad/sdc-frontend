import React, { useState } from 'react';
import ImageModal from './ImageModal.jsx';
import axios from 'axios';
import StarRating from '../sharedComponents/StarRating.jsx';
const ReviewListEntry = ({ review }) => {
  if (review === undefined) { return <div>Error Loading  Component</div> }
  const { summary, rating, body, date, photos, helpfulness, reviewer_name, response, recommend } = review;
  const textLimit = 60;
  let [visibleBody, setVisibleBody] = useState(body.slice(0, textLimit));
  return (
    <div className="review-entry">
      <div className="entry-top">
        <StarRating rating={rating} dimensions={15} />
        <div>
          <span className="reviewer-name">{reviewer_name}</span>
          <span className="review-entry-date">
            {new Intl.DateTimeFormat('en-US').format(new Date(date))}
          </span>
        </div>
      </div>
      <div className="review-entry-title">
        {summary.length > 60 ? summary.slice(0, 60) + '...' : summary}
      </div>
      <div className="review-entry-text">
        {
          visibleBody
        }
        {
          visibleBody.length !== body.length ?
            <span>
              <span>...</span>
              <button onClick={e => setVisibleBody(body)}>
                Show More!
              </button>
            </span> : ""
        }
      </div>
      {response ? <div className="review-response">Response from Seller: {response}</div> : ""}
      {
        photos.map(({ url }) => <ImageModal key={url} imageUrl={url} dimensions={50}/>)
      }
      <div>
        {recommend ? <span>I recommend this product✔️</span> : ""}
      </div>
      <div>
        <span>Helpful?          <a href="">Yes</a>
          <span>{helpfulness}</span>
        </span>|
        <span>
          <a href="">Report</a>
        </span>
      </div>
    </div >
  )
};

export default ReviewListEntry;