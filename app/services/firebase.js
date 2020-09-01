  
  import * as firebase from 'firebase/app';
  import 'firebase/firestore'
  import 'firebase/auth'
  import 'firebase/storage'



  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC7XNgKm8LNnDRpM2PQOxoG6Ad1aRQyfYA",
    authDomain: "tulaburo-e237c.firebaseapp.com",
    databaseURL: "https://tulaburo-e237c.firebaseio.com",
    projectId: "tulaburo-e237c",
    storageBucket: "tulaburo-e237c.appspot.com",
    messagingSenderId: "300204761579",
    appId: "1:300204761579:web:e69bce8528161f96de39ae",
    measurementId: "G-VLDVVXV36G"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;

  //auth
  export var auth = firebase.auth();
             auth.languageCode = 'es-AR';
  export var FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
  export var GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
  export var EmailAuthProvider = firebase.auth.EmailAuthProvider
  export var PhoneAuthProvider =  firebase.auth.PhoneAuthProvider;

  //Database & Storage
  export var db = firebase.firestore()
  export var storage = firebase.storage(); 
