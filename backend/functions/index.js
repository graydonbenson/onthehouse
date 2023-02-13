const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
let db = admin.firestore();

const express = require("express");
const app = express();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

app.get("/users", (req, res) => {
    let users = [];
    db.collection("Users").get().then((querySnap) => {
        querySnap.forEach((doc) => {
            users.push(doc.data());
        });
        return res.json(users);
    }).catch(error => console.error(error));
});

// Setting endpoint routes to start with /api
exports.api = functions.https.onRequest(app);