import React, { useState, useEffect } from "react";
import StarRating from '../sharedComponents/StarRating.jsx';

import axios from 'axios';

import './RelatedItemsAndOutfitCreation.css'

const AddOutfitCard = ({ productId, setOutfitList, outfitList }) => {
  const handleAddOutfit = () => {
    getOutfitData(productId)
      .then(item => {
        if (outfitList.find(outfit => outfit.product_id === item.product_id)) return;
        setOutfitList((outfitList) => {
          const newRelatedList = [...outfitList, item];
          localStorage.setItem('fecOutfitList',JSON.stringify(newRelatedList));
          return newRelatedList
        });
      })
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
    <div className="add-card-item" onClick={handleAddOutfit}>
        <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className="add-card-button"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-4H7v-2h4V7h2v4h4v2h-4v4z" />
  </svg>
    </div>
  )
};

export default AddOutfitCard;