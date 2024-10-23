
import React from 'react';
import StarRating from '../sharedComponents/StarRating.jsx';
const CardComparison = ({ item1, item2 }) => {
  if (!item1 || !item2) { return <div>N/A image</div> }




  console.log(item1);
  console.log(item2);
  item2.sale_price=50;
  return (<div id='card-comparison'>
    <table>
      <thead><tr><th></th><th></th></tr></thead>
      <tbody>
        <tr>
          <td>{item1.name}</td>
          <td>{item2.name}</td>
        </tr>
        <tr><td><img src={item1.thumbnail_url} /></td><td><img src={item2.thumbnail_url} /></td></tr>
        <tr><td><StarRating rating={item1.avgRating} dimensions={40} /></td><td><StarRating rating={item2.avgRating} dimensions={40} /></td></tr>
        <tr><td>{item1.category}</td><td>{item2.category}</td></tr>
        <tr><td>{
          item1.sale_price?<span className='original-pricestrike-out '>${item1.original_price}</span>:<span>${item1.original_price}</span>
          }
          {
            item1.sale_price?<span className='sale-price'>${item1.sale_price}</span>:""
          }
        </td>
          <td>
          {
          item2.sale_price?<span className='original-pricestrike-out '>${item2.original_price}</span>:<span>${item2.original_price}</span>
          }
          {
            item2.sale_price?<span className='sale-price'>${item2.sale_price}</span>:""
          }
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
};

export default CardComparison;