import React from "react";

const ProductList = ({ products }) => {
  if (!products.length) {
    return <p>Nenhum produto cadastrado</p>;
  }

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - R$ {p.price}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;