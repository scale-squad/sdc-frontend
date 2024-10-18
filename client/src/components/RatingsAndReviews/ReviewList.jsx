
import React, { useEffect, useState } from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';
import axios from 'axios';
import AddAReviewForm from './form/AddAReviewForm.jsx';
const ReviewList = ({ reviewList = [], recommended, productId, starFilter }) => {
  if (reviewList === undefined || recommended === undefined) { return <div>Error Loading Component</div> }

  const totalReviews = (Number(recommended.false) + Number(recommended.true));
  const [sort, setSort] = useState('relevant');
  const [rList, setRList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [page, setPage] = useState(1);
  const countPerQuery = 2;

  const loadAllReviews = () => {
    const params = { params: { sort, product_id: productId, count: 500 } }
    return axios
      .get('/reviews', params)
      .then(res => {
        const filteredList = filterList(res.data.results);
        setRList(filteredList);
        setViewList(filteredList.slice(0, countPerQuery));
      })
      .catch(err => console.log(err));
  };

  const filterList = (list) => {
    let filteredList = list;
    //check if filtering is disabled
    if (!starFilter.every(x => !x)) {
      filteredList = filteredList.filter(({ rating }) => starFilter[rating - 1]);
    }
    return filteredList;
  };

  const moreReviews = (e) => {
    setViewList(rList.slice(0, countPerQuery * (page + 1)));
    setPage(page + 1);
  };

  const changeSort = (e) => {
    const sortType = e.target.value;
    setSort(sortType);
    loadAllReviews(sortType);
    setPage(1);
  };

  useEffect(() => {
    loadAllReviews();
  }, [starFilter, sort]);

  return (<div>

    <div>
      <span>{totalReviews} reviews sorted by</span>
      <select onChange={changeSort} value={sort}>
        <option value='relevant'>Relevant</option>
        <option value='newest'>Newest</option>
        <option value='helpful'>Helpfulness</option>
      </select>
    </div>
    <div>{
      viewList.map((review, i) => <ReviewListEntry key={review.review_id} review={review} />)}
    </div>
    {viewList.length < rList.length ? <button onClick={moreReviews}>MORE REVIEWS  +</button> : ''}
    <AddAReviewForm productId={productId} />
  </div>
  )
};

export default ReviewList;