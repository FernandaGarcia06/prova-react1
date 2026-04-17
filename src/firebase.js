// Importações
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração
const firebaseConfig = {
  apiKey: "AIzaSyCNq0c0THiF8f3VPHmHQr6ZSMzcTSVax58",
  authDomain: "provapraticafernanda.firebaseapp.com",
  projectId: "provapraticafernanda",
  storageBucket: "provapraticafernanda.firebasestorage.app",
  messagingSenderId: "660009594384",
  appId: "1:660009594384:web:61ad35542885036a25a495"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);