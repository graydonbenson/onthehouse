var express = require('express');
var app = express();
const PORT = process.env.PORT || 6000;

app.get('/', (req, res) => {
  res.send('This is the firebase endpoint');
});

app.listen(PORT, function () {
  console.log(`Demo project at: ${PORT}!`);
});
