import React from "react";

const ProductSlogan = ({ product }) => {
  return (
    <div className="product-container">
      <div className="info-list">
        <h3>{product?.slogan}</h3>
        <span>{product?.description}</span>
      </div>
      <div className="description">
        {product?.features?.map((feature, i) => (
          <div key={i} className="feature-item">
           ✔️<span>{feature.value}</span>  <span>{feature.feature}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductSlogan;
