import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario || null);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) {
      setEmail("");
      setSenha("");
    }
  }, [user]);

  const cadastrar = async () => {
    if (!email || !senha) {
      return alert("Erro: preencha tudo");
    }

    await createUserWithEmailAndPassword(auth, email, senha);
  };

  const login = async () => {
    if (!email || !senha) {
      return alert("Erro: preencha tudo");
    }

    await signInWithEmailAndPassword(auth, email, senha);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="auth-container">
      {user ? (
        <>
          <h2 className="auth-title">Logado</h2>
          <p>{user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <h2 className="auth-title">
            {isLogin ? "Login" : "Cadastro"}
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button onClick={isLogin ? login : cadastrar}>
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>

          <p
            className="auth-switch"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Criar conta" : "Já tem conta? Entrar"}
          </p>
        </>
      )}
    </div>
  );
};

export default Auth;