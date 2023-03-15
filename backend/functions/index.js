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

const { FieldValue } = require('firebase-admin/firestore');

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

// !Posts
// GET /posts - get all posts
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

// GET /posts/:id - get post by post id
app.get('/posts/:id', (req, res) => {
  db.collection('Posts')
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        const postId = doc.id;
        return res.json({ postId, ...doc.data() });
      } else {
        console.log('No such document!');
        res.send({ message: 'No such document!' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

// POST /posts - create a new post
app.post('/posts', (req, res) => {
  const newPost = {
    title: req.body.title,
    description: req.body.description,
    recipe: req.body.recipe,
    image: req.body.image,
    flair: req.body.flair,
    userId: req.body.userId,
    upvoteCount: 0,
    date: new Date(),
  };

  db.collection('Posts')
    .doc()
    .set(newPost)
    .then(() => {
      console.log('Post document successfully created!');
      res.send({ message: 'Created Post Successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

// POST /upvotes - upvote a post
app.post('/upvotes', (req, res) => {
  const newUpvote = {
    postId: req.body.postId,
    userId: req.body.userId,
    isUpvote: req.body.isUpvote,
  };

  const docId = `${newUpvote.postId}_${newUpvote.userId}`;

  /*if documentId w/ post and user id exists:
  if isUpvote matches
  	throw error
  else
  	update isUpvote for found record
else:
  create a new record
*/

  db.collection('Upvotes')
    .doc(docId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (doc.data().isUpvote === newUpvote.isUpvote) {
          const message = 'Post has already been upvoted/downvoted by user.';
          console.log(message);
          res.send({ message: message });
        } else {
          // Update isUpvote in found record
          db.collection('Upvotes')
            .doc(docId)
            .update({ isUpvote: newUpvote.isUpvote })
            .then(() => {
              console.log('IsUpvote attribute updated!');
            })
            .catch((error) => {
              console.error(error);
              res.send(error);
            });

          /*
			user upvoted it, so
			upvoteCount: 1

			then downvote it: -1

			
			user downvoted it, so
			upvoteCount: 1

			then upvote it: 3
			*/

          // Update upvoteCount in posts
          db.collection('Posts')
            .doc(newUpvote.postId)
            .update({
              upvoteCount: newUpvote.isUpvote
                ? FieldValue.increment(2)
                : FieldValue.increment(-2),
            })
            .then(() => {
              console.log('upvoteCount attribute updated!');
              res.send({ message: 'Upvoted/Downvoted Post Successfully' });
            })
            .catch((error) => {
              console.error(error);
              res.send(error);
            });
        }
      } else {
        // Create a new record
        db.collection('Upvotes')
          .doc(docId)
          .set(newUpvote)
          .then(() => {
            console.log('Upvote document successfully created!');
          })
          .catch((error) => {
            console.error(error);
            res.send(error);
          });

        // Update upvoteCount in posts
        db.collection('Posts')
          .doc(newUpvote.postId)
          .update({
            upvoteCount: newUpvote.isUpvote
              ? FieldValue.increment(1)
              : FieldValue.increment(-1),
          })
          .then(() => {
            console.log('upvoteCount attribute updated!');
            res.send({ message: 'Upvoted/Downvoted Post Successfully' });
          })
          .catch((error) => {
            console.error(error);
            res.send(error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

// Setting endpoint routes to start with /api
exports.api = functions.https.onRequest(app);
