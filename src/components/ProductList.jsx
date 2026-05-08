import React from "react";
 
const ProductList = ({ products }) => {
  if (!products.length) {
    return <p>Nenhum produto cadastrado</p>;
  }
 
  return (
<div>
<ul>
        {products.map((p) => (
<li key={p.id}>
            {p.name} - R$ {p.price}
</li>
        ))}
</ul>
 
      <img
        src="https://takkoosggyockvgawvjr.supabase.co/storage/v1/object/public/Bonecos%20Marvel/bonecoHomemAranha.jpg"
        alt="Homem Aranha"
        width="200"
      />
       <img
        src="https://takkoosggyockvgawvjr.supabase.co/storage/v1/object/public/Bonecos%20Marvel/bonecoLoki.jpg"
        alt="Loki"
        width="200"
      />
</div>
  );
};
 
export default ProductList;