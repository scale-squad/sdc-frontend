import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import StarRating from "./sharedComponents/StarRating.jsx";
import QuestionsAndAnswers from "./QuestionsAndAnswers/QuestionsAndAnswers.jsx";
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import RelatedItemsAndOutfitCreation from "./RelatedItemsAndOutfitCreation/RelatedItemsAndOutfitCreation.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviews.jsx";
const App = () => {
  let [productId, setProductId] = useState(40344);
  let [styleId, setStyleId] = useState(1);
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-list">
        <li className="navbar-item"></li>
        </ul>
      </nav>
      <ProductDetail
        productId={productId}
        styleId={styleId}
        setStyleId={setStyleId}
      />
      <RelatedItemsAndOutfitCreation
        productId={productId}
        setProductId={setProductId}
        styleId={styleId}
      />
      <QuestionsAndAnswers productId={productId} />
      <RatingsAndReviews productId={productId} />
    </div>
  );
};

export default App;
