// Dummy Firebase initialization code for optimization mock
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForElectraSync12345",
  authDomain: "electrasync-demo.firebaseapp.com",
  projectId: "electrasync-demo",
  storageBucket: "electrasync-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
