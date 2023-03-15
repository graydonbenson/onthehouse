const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} = require('firebase/auth');

admin.initializeApp();
const db = admin.firestore();

const express = require('express');
const app = express();
app.use(cors());

const firebaseConfig = {
  apiKey: 'AIzaSyAZToVDJJDQle7Z6Q-fevMs9CF-xWZfbFw',
  authDomain: 'seng-401-on-the-house.firebaseapp.com',
  projectId: 'seng-401-on-the-house',
  storageBucket: 'seng-401-on-the-house.appspot.com',
  messagingSenderId: '439573630964',
  appId: '1:439573630964:web:98ca7406811fc583fef3a1',
  measurementId: 'G-EFH2Y2NN1X',
};

initializeApp(firebaseConfig);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// ! Users Endpoints
// GET /users - get all users (from firestore)
app.get('/users', (req, res) => {
  let users = [];
  db.collection('Users')
    .get()
    .then((querySnap) => {
      querySnap.forEach((doc) => {
        users.push(doc.data());
      });
      return res.json(users);
    })
    .catch((error) => console.error(error));
});

// for frontend if /signup api request is successful, redirect to login page
// POST /signup - add user (to firebase auth and firestore)
app.post('/signup', async (req, res) => {
  const registerUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const auth = getAuth();
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      registerUser.email,
      registerUser.password
    );
    db.collection('Users')
      .doc(userCredentials.user.uid)
      .set({
        fullName: registerUser.fullName,
        email: registerUser.email,
        username: registerUser.username,
      })
      .then(() => {
        console.log('User document successfully created!');
        res.send({ message: 'Created User Successfully' });
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });
  } catch (error) {
    console.error(error);
    res.send(error); // for frontend - if error sent/check status code is not 200 then alert(error.message)
  }
});

// for frontend, if successful login save returned user object (or just email) in session/browser Storage
// GET /login - get user (from firebase auth) given user's email and password parameters
app.get('/login', async (req, res) => {
  const loginUser = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const auth = getAuth();
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      loginUser.email,
      loginUser.password
    );
    res.send(userCredentials);
  } catch (error) {
    console.error(error);
    res.send(error); // for frontend - if error sent/check status code is not 200 then alert(error.message)
  }
});

// POST /resetPassword - send user a password reset link to their email address
app.post('/resetPassword', async (req, res) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, req.body.email);
    res.send({ message: `Password reset link sent to ${req.body.email}!` });
  } catch (error) {
    console.error(error);
    res.send(error); // for frontend - if error sent/check status code is not 200 then alert(error.message)
  }
});

// POST /logout - signout user
app.post('/logout', async (req, res) => {
  try {
    const auth = getAuth();
    signOut(auth);
    res.send({ message: 'Successfully logged out user' });
  } catch (error) {
    console.error(error);
    res.send(error); // for frontend - if error sent/check status code is not 200 then alert(error.message)
  }
});

app.get('/posts', (req, res) => {
  let posts = [];
  db.collection('Posts')
    .get()
    .then((querySnap) => {
      querySnap.forEach((doc) => {
        posts.push(doc.data());
      });
      return res.json(posts);
    })
    .catch((error) => console.error(error));
});

app.get('/posts/:id', (req, res) => {
  db.collection('Posts').doc(req.params.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          return res.json(doc.data());
      } else {
          console.log("No such document!");
          res.send({ message: 'No such document!' });
      }
  }).catch((error) => {
      console.error(error);
      res.send(error);
  });
});

// Setting endpoint routes to start with /api
exports.api = functions.https.onRequest(app);
