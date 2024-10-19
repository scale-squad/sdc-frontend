import React, { useState } from 'react';
import ImageModal from './ImageModal.jsx';
import axios from 'axios';
import StarRating from '../sharedComponents/StarRating.jsx';
const ReviewListEntry = ({ review, loadReviews }) => {
  if (review === undefined) { return <div>Error Loading  Component</div> }
  const { summary, rating, body, date, photos, helpfulness, reviewer_name, response, recommend } = review;
  const textLimit = 60;
  let [visibleBody, setVisibleBody] = useState(body.slice(0, textLimit));
  let [helpful, setHelpful] = useState(localStorage.getItem(`FECreview_helpful_${review.review_id}`));
  let [report, setReport] = useState(localStorage.getItem(`FECreview_report_${review.review_id}`));
  let [helpfullCount, setHelpfulCount] = useState(helpfulness);

  const handleHelpful = () => {
    axios
      .put(`/reviews/${review.review_id}/helpful`)
      .then(r => {
        const key = `FECreview_helpful_${review.review_id}`;
        localStorage.setItem(key, true);
        setHelpful(true);
        setHelpfulCount(helpfullCount + 1);
      })
      .catch(err => console.log(err))
  }

  const handleReport = () => {
    axios
      .put(`/reviews/${review.review_id}/report`)
      .then(r => {
        const key = `FECreview_report_${review.review_id}`;
        localStorage.setItem(key, true);
        setReport(true);
      })
      .catch(err => console.log(err))
  }

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
        photos.map(({ url }) => <ImageModal key={url} imageUrl={url} dimensions={50} />)
      }
      <div>
        {recommend ? <span>I recommend this product✔️</span> : ""}
      </div>
      <div>

        <span className="mark-btn">Helpful?           {
          helpful ?
            <b >Yes</b> :
            <a href="#" onClick={handleHelpful}>Yes</a>
        }
          <span>{helpfullCount}</span>
        </span>
        <span>|</span>
        <span>
          {
            report ?
              <b>Reported</b> :
              < a href="#" onClick={handleReport}>Report</a>
          }
        </span>
      </div>
    </div >
  )
};

export default ReviewListEntry;