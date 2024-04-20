// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp_V42j5UbHrRwHujgm4TAY5cwwUlK-80",
  authDomain: "lahacks24.firebaseapp.com",
  projectId: "lahacks24",
  storageBucket: "lahacks24.appspot.com",
  messagingSenderId: "671741576985",
  appId: "1:671741576985:web:59ad381f23aefad08a6788",
  measurementId: "G-JRN913B7DZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);