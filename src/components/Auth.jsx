import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

const Auth = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [cadastroFeito, setCadastroFeito] = useState(false);

  const cadastrar = async () => {
    if (!email || !senha) {
      return alert("Erro: preencha tudo");
    }

    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, senha);
      await sendEmailVerification(credencial.user);
      await signOut(auth);
      setCadastroFeito(true);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Erro: este email já está cadastrado");
      } else if (err.code === "auth/invalid-email") {
        alert("Erro: email inválido");
      } else if (err.code === "auth/weak-password") {
        alert("Erro: a senha deve ter pelo menos 6 caracteres");
      } else {
        console.log(err.code);
        alert("Erro ao cadastrar");
      }
    }
  };

  const login = async () => {
    if (!email || !senha) {
      return alert("Erro: preencha tudo");
    }

    try {
      const credencial = await signInWithEmailAndPassword(auth, email, senha);

      if (!credencial.user.emailVerified) {
        await signOut(auth);
        return alert("Você precisa verificar seu email antes de entrar. Verifique sua caixa de entrada.");
      }

      setUser(credencial.user);
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        alert("Email ou senha incorretos");
      } else if (err.code === "auth/invalid-email") {
        alert("Erro: email inválido");
      } else if (err.code === "auth/too-many-requests") {
        alert("Muitas tentativas. Tente novamente mais tarde.");
      } else {
        console.log(err.code);
        alert("Erro ao logar");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="auth-container">
      {user ? (
        <>
          <h2 className="auth-title">Logado</h2>
          <p>{user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : cadastroFeito ? (
        <div className="auth-verify-box">
          <span className="auth-verify-icon">📧</span>
          <h2 className="auth-title">Verifique seu email!</h2>
          <p className="auth-verify-text">
            Enviamos um link de verificação para <strong>{email}</strong>.
            <br />
            Acesse sua caixa de entrada e clique no link para ativar sua conta.
          </p>
          <p className="auth-verify-hint">
            Não encontrou? Verifique a pasta de spam.
          </p>
          <button
            onClick={() => {
              setCadastroFeito(false);
              setIsLogin(true);
            }}
          >
            Ir para o Login
          </button>
        </div>
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