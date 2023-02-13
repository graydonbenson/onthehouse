const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
let db = admin.firestore();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

exports.getUsers = functions.https.onRequest((req, res) => {
    let users = [];
    db.collection("Users").get().then((querySnap) => {
        querySnap.forEach((doc) => {
            users.push(doc.data());
        });
        return res.json(users);
    }).catch(error => console.error(error));
});
