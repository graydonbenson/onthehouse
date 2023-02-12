const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5001;

const { users } = require('./models/users');
const { db } = require('./util/admin');

app.get('/users', users);

app.get('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await db.collection('Users').where('email', '==', email);
  const userO = (await user.get()).docs.map((doc) => doc.data());
  console.log(userO);

  if (userO.length !== 0 && userO[0].password == password) {
    res.status(200).json(userO[0]);
  } else {
    res.status(400).send('User not found');
  }
});

app.get('/', (req, res) => {
  res.send('This is the firebase endpoint');
});

app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});
