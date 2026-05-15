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
  onSnapshot,
} from "firebase/firestore";

import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (usuario) => {
      if (usuario && usuario.emailVerified) {
        setUser(usuario);
      } else {
        if (usuario && !usuario.emailVerified) {
          await signOut(auth);
        }
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) {
      setProducts([]);
      return;
    }

    const q = query(
      collection(db, "Personagens"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(lista);
    });

    return () => unsub();
  }, [user]);

  const addProduct = async (product) => {
    if (!user) {
      return alert("Erro: faça login");
    }

    // Salva os dados no Firestore, incluindo o nome do autor (email)
    await addDoc(collection(db, "Personagens"), {
      nome: product.name,
      imageUrl: product.imageUrl || "",
      dataCadastro: new Date(),
      userId: user.uid,
      autor: user.email || "Anônimo",      // ← NOME DO AUTOR
    });
  };

  return (
    <>
      <Header />

      <main>
        <Auth user={user} setUser={setUser} />

        {user && (
          <>
            <img src={ecommerceImg} alt="ecommerce" />

            <ProductForm addProduct={addProduct} />

            <h2>Seus Personagens</h2>

            <ProductList products={products} />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;