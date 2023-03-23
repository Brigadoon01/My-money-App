import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDFtG9GF_9RD3_WEHZm1DuMQlR42OL1mvI",
  authDomain: "my-moneyapp.firebaseapp.com",
  projectId: "my-moneyapp",
  storageBucket: "my-moneyapp.appspot.com",
  messagingSenderId: "180976706431",
  appId: "1:180976706431:web:00e0e308fa04291b98b04a",
};

//? Initialize Firebase
firebase.initializeApp(firebaseConfig);

//? Initialize Service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//? timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
