import React, { useState, useEffect } from "react";

const ProductSlogan= ({product}) => {

  return (
    <div>
      <div>
        <h3>{product?.slogan}</h3>
        <h3>{product?.description}</h3>
      </div>
    </div>
  )
};

export default ProductSlogan;