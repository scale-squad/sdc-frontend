import React from "react";

const ProductSlogan = ({ product }) => {
  return (
    <div className="product-container">
      <div className="description">
        <h3>{product?.slogan}</h3>
        <h3>{product?.category}</h3>
        {product?.features?.map((e, i) => (
          <div key={i} className="feature-item">
            <h3>{e.feature}</h3>
            <p>{e.value}</p>
          </div>
        ))}
      </div>

      <div className="info-list">
        <h3>{product?.description}</h3>
      </div>
    </div>
  );
};

export default ProductSlogan;
