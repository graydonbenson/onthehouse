var admin = require('firebase-admin');

var serviceAccount = require('../seng-401-on-the-house-firebase-adminsdk-tfivk-802e324d26.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };