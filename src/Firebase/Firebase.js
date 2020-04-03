import Firebase from 'firebase';

 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDE5hJRVqXrj3oJdb44g4GsW9i4o81SUKw",
    authDomain: "reactnativecontactapp.firebaseapp.com",
    databaseURL: "https://reactnativecontactapp.firebaseio.com",
    projectId: "reactnativecontactapp",
    storageBucket: "reactnativecontactapp.appspot.com",
    messagingSenderId: "100055938231",
    appId: "1:100055938231:web:e5434bd96cc0c75b9b0932",
    measurementId: "G-HQ2EKKYBTG"
  };
  // Initialize Firebase
  export let firebase = Firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  //console.log(Firebase);
  //let app = Firebase.initializeApp(config);
//export const db = app.database();