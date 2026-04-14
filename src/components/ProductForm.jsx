import React, { useState } from 'react';

const ProductForm = ({ addProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // validação
    if (!name || !price) return;

    addProduct({ name, price });

    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nome do Produto" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />

      <input 
        type="number" 
        placeholder="Preço" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
      />

      <button type="submit">
        🛒 Adicionar Produto
      </button>
    </form>
  );
};

export default ProductForm;