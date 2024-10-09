import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import StarRating from './StarRating.jsx';

const App = () => {
  let [productId, setProductId] = useState(65631);
  let [styleId, setStyleId] = useState(1);
  return (<div>
    <p>{productId}</p>
  </div>
  )
};

export default App;
