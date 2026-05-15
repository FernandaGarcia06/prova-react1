import React, { useState } from "react";

const ProductForm = ({ addProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState("");
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);   // string base64 completa
      setPreview(reader.result);  // preview na tela
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) {
      setError("Erro: preencha nome e preço");
      return;
    }

    setError("");
    addProduct({ name, price, imageUrl: base64 });
    setName("");
    setPrice("");
    setPreview("");
    setBase64("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={styles.input}
      />

      <label style={styles.fileLabel}>
        {preview ? "Trocar imagem" : "Selecionar imagem"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      {preview && (
        <img src={preview} alt="preview" style={styles.preview} />
      )}

      <button type="submit" style={styles.btn}>
        Adicionar
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    maxWidth: 400,
    margin: "0 auto",
  },
  input: {
    padding: "8px 12px",
    fontSize: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  fileLabel: {
    display: "inline-block",
    padding: "8px 16px",
    background: "#e5e7eb",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
  },
  preview: {
    width: 120,
    height: 120,
    objectFit: "cover",
    borderRadius: 8,
    border: "2px solid #2563eb",
  },
  btn: {
    padding: "10px 0",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default ProductForm;