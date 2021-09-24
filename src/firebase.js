import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBVSAiFp1L2tEZ7nfIJAcMNzwKK4rR_ni8",
  authDomain: "parbat-5db79.firebaseapp.com",
  projectId: "parbat-5db79",
  storageBucket: "parbat-5db79.appspot.com",
  messagingSenderId: "894642265818",
  appId: "1:894642265818:web:d9269918c486c79aa34fe3"
};

firebase.initializeApp(firebaseConfig);
export {firebase}
