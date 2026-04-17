import React, { useState } from "react";

const ProductForm = ({ addProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) {
      setError("Erro: preencha tudo");
      return;
    }

    setError("");

    addProduct({ name, price });

    setName("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit">Adicionar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ProductForm;