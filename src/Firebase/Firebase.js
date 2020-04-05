import Firebase from 'firebase';

 // Your web app's Firebase configuration
  const firebaseConfig = {
	    apiKey: "AIzaSyCLX771YNOUWiGv_tdn02NkaJ0nPtbgc6M",
		authDomain: "reactnativeapp-6dd35.firebaseapp.com",
		databaseURL: "https://reactnativeapp-6dd35.firebaseio.com",
		projectId: "reactnativeapp-6dd35",
		storageBucket: "reactnativeapp-6dd35.appspot.com",
		messagingSenderId: "182952232385",
		appId: "1:182952232385:web:75d3aeaf5c1fc4206d5b40",
		measurementId: "G-BYWJDV674H"
	};
  // Initialize Firebase
  export const firebase = Firebase.initializeApp(firebaseConfig);

  console.log(firebase);
