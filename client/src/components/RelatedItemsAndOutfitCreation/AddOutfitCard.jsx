import React, { useState, useEffect } from "react";
import StarRating from '../sharedComponents/StarRating.jsx';
import { FiPlusCircle } from "react-icons/fi";
import axios from 'axios';

import './RelatedItemsAndOutfitCreation.css'
const AddOutfitCard = ({ productId, setOutfitList, outfitList }) => {

  const handleAddOutfit = () => {
    console.log(productId);
    console.log(outfitList.find(outfit => outfit.product_id === productId))
    console.log(outfitList)
    if (outfitList.find(outfit => outfit.product_id === productId)) return;
    getOutfitData(productId)
      .then(item => setOutfitList([...outfitList, item]))
      .catch(err => console.log(err));

  };

  const getOutfitData = (pID) => {
    const query = { params: { product_id: pID } }
    return Promise.all(
      [
        axios.get(`/products/${pID}/styles`).then(res => res.data),
        axios.get(`/reviews/meta`, query).then(res => res.data),
        axios.get(`/products/${pID}`).then(res => res.data)
      ])
      .then(res => {
        const { product_id } = res[0];
        const defaultStyle = res[0].results.find(x => x['default?']) || res[0].results[0];
        const { original_price, sale_price } = defaultStyle;
        const thumbnail_url = defaultStyle.photos[0].thumbnail_url;
        const { ratings } = res[1];
        const entries = Object.entries(ratings)
        const [total, count] = entries.reduce(([sumTotal, sumCount], [k, v]) =>
          [sumTotal + Number(k) * Number(v), sumCount + Number(v)]
          , [0, 0]);
        const avgRating = total / count;
        const { id, name, category } = res[2];
        const currItem = { product_id, original_price, sale_price, thumbnail_url, avgRating, id, name, category }
        return currItem;
      })
      .catch(err => console.log(err))
  };
  if (!productId) { return <div>Cannot render component</div> }

  return (
    <div className="card-item" onClick={handleAddOutfit}>
      {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxsHiUzleM5qDREK3ww2aBMBUVYhjSMIX2JA&s"
          className="add-outfit-button" alt="Add to Outfit" /> */}
      <FiPlusCircle className="add-outfit-button" />
    </div>
  )
};

export default AddOutfitCard;