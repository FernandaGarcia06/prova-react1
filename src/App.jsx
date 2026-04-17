import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Auth from "./components/Auth";
import ecommerceImg from "./assets/Ecommerce.png";
import "./styles.css";

import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  // auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario || null);
    });

    return () => unsub();
  }, []);

  // firestore realtime
  useEffect(() => {
    if (!user) {
      setProducts([]);
      return;
    }

    const q = query(
      collection(db, "produtos"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(lista);
    });

    return () => unsub();
  }, [user]);

  // add product
  const addProduct = async (product) => {
    if (!user) return alert("Erro: faça login");

    await addDoc(collection(db, "produtos"), {
      name: product.name,
      price: product.price,
      userId: user.uid
    });
  };

  return (
    <>
      <Header />

      <main>
        <Auth />

        {user && (
          <>
            <img src={ecommerceImg} alt="ecommerce" />

            <ProductForm addProduct={addProduct} />

            <h2>Seus Produtos</h2>

            <ProductList products={products} />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;