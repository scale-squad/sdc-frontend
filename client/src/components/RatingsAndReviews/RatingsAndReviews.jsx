
import React, { useEffect, useState } from 'react';
import ReviewList from './ReviewList.jsx';
import './RatingAndReviews.css';
import RatingBreakdown from './RatingBreakdown.jsx';
import SizeComfort from './SizeComfort.jsx';
import axios from 'axios';

const RatingsAndReviews = ({ productId }) => {
  if (productId === undefined) { return <div>Error Loading Component</div> }

  const [metaData, setMetaData] = useState({});
  const [width, setWidth] = useState(window.innerWidth);
  const [starFilter, setStarFilter] = useState([false, false, false, false, false]);

  useEffect(() => {
      getMetaData();
  }, [productId])

  const getMetaData = () => axios
    .get('/reviews/meta', { params: { product_id: productId } })
    .then(res => setMetaData(res.data))
    .catch(err => console.log(err))

  //for handling scaling
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return (
    <div id="test" className="ratings-and-review-container">
      <div>
        <RatingBreakdown ratings={metaData.ratings} recommended={metaData.recommended} width={width} setStarFilter={setStarFilter} starFilter={starFilter} />
        <SizeComfort characteristics={metaData.characteristics} width={width * .9} />
      </div>
      <div>
        <ReviewList recommended={metaData.recommended} productId={productId}
          starFilter={starFilter} />
      </div>
    </div>
  )
};

export default RatingsAndReviews;