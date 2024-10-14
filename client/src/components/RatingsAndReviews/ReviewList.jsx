
import React, { useEffect, useState } from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';
import axios from 'axios';
const ReviewList = ({ reviewList = [], recommended, productId }) => {
  if (reviewList === undefined || recommended === undefined) { return <div>Error Loading Component</div> }
  const totalReviews = (Number(recommended.false) + Number(recommended.true));
  // const handleSortChange = (e)=>{
  //   axios.get('/reviews')
  // }
  const [sort, setSort] = useState('newest');
  const [rList, setRList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [page, setPage] = useState(1);
  const countPerQuery = 2;
  const loadAllReviews = () => {
    const params = { params: { sort, product_id: productId, count: 200000 } }
    axios
      .get('/reviews', params)
      .then(res => {
        setRList(res.data.results);
        setViewList(res.data.results.slice(0, countPerQuery));
      })
      .catch(err => console.log(err));
  };
  const addReviews = (e) => {
    setViewList(rList.slice(0, countPerQuery * (page + 1)));
    setPage(page + 1);
  }
  /* const addReviews = (e)=>{
     const params = { params:{ sort, product_id: productId, count: countPerQuery, page } }
     axios
       .get('/reviews', params)
       .then(res => {
         setRList([...rList, ...res.data.results]);
         setPage(page+1);
       })
       .catch(err => console.log(err));
   };*/
  /* const changeSort = (e)=>{
     const params = { params:{ sort:e.target.value, product_id: productId, count: countPerQuery, page:1 } }
     setSort(e.target.value);
     axios
       .get('/reviews', params)
       .then(res => {
         setRList(res.data.results);
         setPage(2);
       })
       .catch(err => console.log(err));
   };*/
  const changeSort = (e) => {
    //const params = { params: { sort: e.target.value, product_id: productId, count: countPerQuery, page: 1 } }
    setSort(e.target.value);
    let sortBy = null;
    if (e.target.value === "helpful") {
      sortBy = (a, b) => b.helpfulness - a.helpfulness;
    } else if (e.target.value === "newest") {
      sortBy = (a, b) => b.date - a.date;
    } else {
      sortBy = (a, b) => (b.date>a.date?1:-1)+ (b.helpfulness> a.helpfulness?-1:1);
    }
    const sortedList = rList.slice().sort(sortBy);
    setViewList(sortedList.slice(0, countPerQuery * page));
  }
  useEffect(() => {
    loadAllReviews();
  }, [])
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
      viewList.map((review, i) => <ReviewListEntry key={review + i} review={review} />)}
    </div>
    <button>ADD A REVIEW  +</button>
    <button onClick={addReviews}>MORE REVIEWS  +</button>
  </div>
  )
};

export default ReviewList;