import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import StarRating from './StarRating.jsx';

const App = () => {
  let [productId, setProductId] = useState(65631);
  let [styleId, setStyleId] = useState(1);
  return (<div>
    <StarRating rating={5} />
    <StarRating rating={4.89} enableText={true} />
    <StarRating rating={4.85} enableText={true} />
    <StarRating rating={4.75} enableText={true} />
    <StarRating rating={3.25} />
    <StarRating rating={2.11} />
    <StarRating rating={1.9} />
    <StarRating rating={1.8} />
    <StarRating rating={"1.75"} />
    <StarRating rating={1.6} />
    <StarRating rating={1.5} />
    <StarRating rating={1} />
    <p>{productId}</p>
  </div>
  )
}
  ;

export default App;
