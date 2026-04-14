import React from 'react';

const ProductList = ({ products }) => {
  return (
    <ul>
      {products.map((product, index) => (
        <li key={index}>
          {product.name} - R${product.price}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;