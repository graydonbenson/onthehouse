const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require ("firebase/auth");
const { doc, setDoc } = require("firebase/firestore");

admin.initializeApp();
const db = admin.firestore();

const express = require("express");
const app = express();
app.use(cors());

const firebaseConfig = {
    apiKey: "AIzaSyAZToVDJJDQle7Z6Q-fevMs9CF-xWZfbFw",
    authDomain: "seng-401-on-the-house.firebaseapp.com",
    projectId: "seng-401-on-the-house",
    storageBucket: "seng-401-on-the-house.appspot.com",
    messagingSenderId: "439573630964",
    appId: "1:439573630964:web:98ca7406811fc583fef3a1",
    measurementId: "G-EFH2Y2NN1X"
};

initializeApp(firebaseConfig);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started


app.get("/users", (req, res) => {
    let users = [];
    db.collection("Users").get().then((querySnap) => {
        querySnap.forEach((doc) => {
            users.push(doc.data());
        });
        return res.json(users);
    }).catch(error => console.error(error));
});

app.post("/signup", async (req, res) => {
    const registerUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    try {
        const auth = getAuth();
        const userCredentials = await createUserWithEmailAndPassword(auth, registerUser.email, registerUser.password);
        db.collection("Users").doc(userCredentials.user.uid).set({
            fullName: registerUser.fullName,
            email: registerUser.email,
            username: registerUser.username
        }).then(() => { 
        console.log("Document successfully written!");
        res.send({ successMessage: "Created User Successfully" });
        }).catch((error) => {
            console.error(error);
            res.send(error);
        });
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

// Setting endpoint routes to start with /api
exports.api = functions.https.onRequest(app);