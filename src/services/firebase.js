// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgxkAUPQDxbnHouey5hil3pv1zeiheFnc",
    authDomain: "tienda-itla.firebaseapp.com",
    projectId: "tienda-itla",
    storageBucket: "tienda-itla.appspot.com",
    messagingSenderId: "969759987103",
    appId: "1:969759987103:web:1739f40fa7f11ce84559aa",
    measurementId: "G-VZ6JMCDZXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)