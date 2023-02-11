var express = require('express');
var app = express();
const PORT = process.env.PORT || 5001;
const { users } = require('./models/users');

app.get('/users', users);

app.get('/', (req, res) => {
  res.send('This is the firebase endpoint');
});

app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});
