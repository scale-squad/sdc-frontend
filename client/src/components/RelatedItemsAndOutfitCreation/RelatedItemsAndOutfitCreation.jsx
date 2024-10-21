import React, { useState, useEffect } from "react";
import axios from 'axios';
import Card from './Card.jsx';
const RelatedItemsAndOutfitCreation = ({ productId }) => {
  //related=>product styles=>reviews meta
  const [relatedList, setRelatedList] = useState([]);
  const [outfitList, setOutfitList] = useState([]);
  useEffect(() => {
    let newRelatedList = [];
    axios
      .get(`/products/${productId}/related`)
      .then(res => {
        const products = res.data;
        //newRelatedList = products.map(({ id, name, category }) => { id, name, category });
        //console.log(products.map((item) => item))
        return Promise.all(
          [...products.map(product => axios.get(`/products/${product}/styles`).then(res => res.data)),
          ...products.map(product => {
            const query = { params: { product_id: product } }
            return axios.get(`/reviews/meta`, query).then(res => res.data)
          }),
          ...products.map(product => axios.get(`/products/${product}`).then(res => res.data))
          ]);
      })
      .then(res => {
        console.log(res);
        for (let i = 0; i < (res.length / 3); i++) {
          const { product_id } = res[i];
          const defaultStyle = res[i].results.find(x => x['default?']) || res[i].results[0];
          const { original_price, sale_price } = defaultStyle;
          const thumbnail_url = defaultStyle.photos[0].thumbnail_url;
          newRelatedList[i] = { original_price, sale_price, product_id, thumbnail_url };
        }
        for (let i = res.length / 3; i < 2/3*res.length; i++) {
          const { ratings } = res[i];
          const entries = Object.entries(ratings)
          const [total, count] = entries.reduce(([sumTotal, sumCount], [k, v]) =>
            [sumTotal + Number(k) * Number(v), sumCount + Number(v)]
            , [0, 0]);
          const avgRating = total / count;
          console.log(i % (res.length / 3))
          newRelatedList[i % (res.length / 3)]['avgRating'] = avgRating;
        }
        for (let i = 2 / 3*res.length; i < res.length; i++) {
          const { id, name, category } = res[i];
          const currItem = newRelatedList[i % (res.length / 3)];
          newRelatedList[i % (res.length / 3)] = { ...currItem, id, name, category };
        }
        console.log(newRelatedList)
        return newRelatedList;
      })
      .then(list => setRelatedList(list))
      .catch(err => console.log(err))
  }, [])
  return (<div>
    <div className="related-carousel">{
      relatedList.length > 0 ?
        relatedList.map(item => <Card key={item.product_id} item={item} type="related" />)
        : <div>
          No Related Items Available
        </div>
    } </div>

    <div className="outfit-carousel"></div>
  </div>
  )
};

export default RelatedItemsAndOutfitCreation;