// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAZToVDJJDQle7Z6Q-fevMs9CF-xWZfbFw',
  authDomain: 'seng-401-on-the-house.firebaseapp.com',
  projectId: 'seng-401-on-the-house',
  storageBucket: 'seng-401-on-the-house.appspot.com',
  messagingSenderId: '439573630964',
  appId: '1:439573630964:web:98ca7406811fc583fef3a1',
  measurementId: 'G-EFH2Y2NN1X',
};

firebase.initializeApp(firebaseConfig); //initialize firebase app 
module.exports = { firebase }; //export the app