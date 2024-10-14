
import React, { useEffect, useState } from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';
import axios from 'axios';
const ReviewList = ({ reviewList = [], recommended, productId, starFilter }) => {
  if (reviewList === undefined || recommended === undefined) { return <div>Error Loading Component</div> }

  const totalReviews = (Number(recommended.false) + Number(recommended.true));
  const [sort, setSort] = useState('relevant');
  const [rList, setRList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [page, setPage] = useState(1);
  const countPerQuery =50;
  console.log(starFilter);
  console.log(viewList.map((review, i) =>review));
  const loadAllReviews = () => {
    const params = { params: { sort, product_id: productId, count: 200000 } }
    return axios
      .get('/reviews', params)
      .then(res => {
        const filteredList = res.data.results.filter(({ rating }) => starFilter[rating - 1]);
        setRList(filteredList)
        setViewList(filteredList.slice(0, countPerQuery));
      })
      .catch(err => console.log(err));
  };

  const moreReviews = (e) => {
    setViewList(rList.slice(0, countPerQuery * (page + 1)));
    setPage(page + 1);
  };
  const changeSort = (e) => {
    setSort(e.target.value)

    let sortBy = null;
    if (e.target.value === "helpful") {
      sortBy = (a, b) => b.helpfulness - a.helpfulness;
    } else if (e.target.value === "newest") {
      sortBy = (a, b) => b.date - a.date;
    } else {
      sortBy = (a, b) => b.date - a.date;
      //return loadAllReviews();

    }
    const sortedList = rList.slice().sort(sortBy);
    setViewList(sortedList.slice(0, countPerQuery * page));
  };

  useEffect(() => {
    loadAllReviews();
  }, []);

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
      viewList.map((review, i) => <ReviewListEntry key={review.review_id } review={review} />)}
    </div>
    <button>ADD A REVIEW  +</button>
    {viewList.length < rList.length ? <button onClick={moreReviews}>MORE REVIEWS  +</button> : ''}
  </div>
  )
};

export default ReviewList;