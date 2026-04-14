import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ecommerceImg from './assets/Ecommerce.png';
import './styles.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Sistema de Produtos iniciado");
  }, []);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <>
      <Header />

      <main>
        <img 
          src={ecommerceImg}
          alt="ecommerce"
        />

        <ProductForm addProduct={addProduct} />

<h2>Lista de Produtos:</h2>

<ProductList products={products} />
      </main>

      <Footer />
    </>
  );
}

export default App;