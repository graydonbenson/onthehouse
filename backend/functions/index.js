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
    const auth = await getAuth();
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      registerUser.email,
      registerUser.password
    );

    // Check if username exists
    const usernameRef = await db.collection('Users').doc(registerUser.username);

    const doc = await usernameRef.get();
    if (!doc.exists) {
      console.log('No such document!');

      await db
        .collection('Users')
        .doc(registerUser.username)
        //   .doc(userCredentials.user.uid)
        .set(
          {
            fullName: registerUser.fullName,
            email: registerUser.email,
            username: registerUser.username,
          },
          { merge: false }
        )
        .then(() => {
          console.log('User document successfully created!');
          res.send({ message: 'Created User Successfully' });
        })
        .catch((error) => {
          console.error(error);
          res.send(error);
        });
    } else {
      console.log('Document data:', doc.data());
      res.send({ message: 'Username already taken.' });
    }
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
    // Get usercredentials from firestore
    const userEmailRef = await db.collection('Users');
    //   .doc(registerUser.username)
    // .doc(userCredentials.user.uid)
    const snapshot = await userEmailRef
      .where('email', '==', loginUser.email)
      .get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      res.send({ message: 'No matching documents!' });
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      res.send({ ...doc.data(), ...userCredentials });
    });

    // res.send(userCredentials);
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
        let postId = doc.id;
        console.log(postId);
        console.log(getuserNamebyUserId(doc.data().userId));
        posts.push({
          postId,
          username: getuserNamebyUserId(doc.data().userId),
          ...doc.data(),
        });
      });
      return res.json(posts);
    })
    .catch((error) => console.error(error));
});

// GET /posts/user/:userId - get posts associated with a userId
app.get('/posts/user/:userId', (req, res) => {
  db.collection('Posts')
    .where('userId', '==', req.params.userId)
    .get()
    .then((querySnap) => {
      if (!querySnap.empty) {
        let userPosts = [];
        querySnap.forEach((doc) => {
          userPosts.push(doc.data());
        });

        return res.json({ ...userPosts });
      } else {
        console.log('No posts associated with this user');
        res.send({ message: 'No posts associated with this user' });
      }
    })
    .catch((error) => {
      console.error('error');
      res.send(error);
    });
});

// GET /posts/:id - get post by post id
app.get('/posts/:id', (req, res) => {
  db.collection('Posts')
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let comments = [];
        db.collection('Posts')
          .doc(doc.id)
          .collection('Comments')
          .get()
          .then((querySnap) => {
            querySnap.forEach((doc) => {
              comments.push(doc.data());
            });

            const postId = doc.id;
            return res.json({ postId, ...doc.data(), comments });
          })
          .catch((error) => {
            console.error(error);
            res.send(error);
          });
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

// PATCH /posts/:id - updates a specific post without overwriting previously defined attributes
app.patch('/posts/:id', (req, res) => {
  console.log(req.body);
  db.collection('Posts')
    .doc(req.params.id)
    .update(req.body)
    .then(() => {
      console.log('Post updated successfully.');
      res.send('Post updated successfully.');
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// POST /posts - create a new post
app.post('/posts', (req, res) => {
  const newPost = {
    title: req.body.title,
    description: req.body.description,
    // recipe: req.body.recipe, - split up recipe below
    ingredients: req.body.ingredients,
    directions: req.body.directions,
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

// GET /upvotes - check if specific user upvoted specific post
app.get('/upvotes', async (req, res) => {
  const docId = `${req.body.postId}_${req.body.userId}`;
  try {
    const upvotesRef = await db.collection('Upvotes').doc(docId);
    const doc = await upvotesRef.get();

    if (!doc.exists) {
      console.log('No upvotes associated with this user on this post');
      res.send({
        message: 'No upvotes associated with this user on this post',
      });
    } else {
      console.log('Document data:', doc.data());
      res.send(doc.data());
    }
  } catch (error) {
    console.error(error);
    res.send(error);
  }
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

// DELETE /posts/:id - deletes a specific post
app.delete('/posts/:id', (req, res) => {
  db.collection('Posts')
    .doc(req.params.id)
    .delete()
    .then(() => {
      console.log('Post successfully deleted.');
      res.send('Post successfully deleted.');
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

// Comments
// POST /comments/:postId - add a comment to a specific post
app.post('/comments/:postId', async (req, res) => {
  const newComment = {
    message: req.body.message,
    userId: req.body.userId,
  };

  await db
    .collection('Posts')
    .doc(req.params.postId)
    .collection('Comments')
    .doc()
    .set(newComment)
    .then(() => {
      console.log('Comment document successfully created!');
      res.send({ message: 'Created Comment Successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

// !Helper Function
async function getuserNamebyUserId(userId) {
  await db
    .collection('Users')
    .doc(userId)
    .get()
    .then((doc) => {
      const username = doc.data().username;
      console.log('Document data:', username);
      return { username };
    })
    .catch((error) => {
      console.error(error);
    });
}

// Setting endpoint routes to start with /api
exports.api = functions.https.onRequest(app);
