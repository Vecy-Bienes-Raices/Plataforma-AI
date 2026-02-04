import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAT9c4GXNJZhOwAkEbVufsKhNoWWlfk01k",
    authDomain: "vecy-plataforma.firebaseapp.com",
    projectId: "vecy-plataforma",
    storageBucket: "vecy-plataforma.firebasestorage.app",
    messagingSenderId: "467837209448",
    appId: "1:467837209448:web:1e2af62e81ea7af78324dd",
    measurementId: "G-JBQW4W4QSC"
};

// Initialize Firebase
// Utiliza un patrón singleton para evitar reinicializar en hot-reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
