// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbwXwO-akOqPox8YMv5K2YTz8CuNS3IEE",
  authDomain: "shopit-1f3d1.firebaseapp.com",
  projectId: "shopit-1f3d1",
  storageBucket: "shopit-1f3d1.appspot.com",
  messagingSenderId: "31440046276",
  appId: "1:31440046276:web:47bf44a5d6b3ece78f2191",
  measurementId: "G-XBEXDK4E9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)