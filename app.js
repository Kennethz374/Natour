const express = require('express');

const app = express(); // add methods to app

app.get('/', (req, res) => {
  res.status(200).send('Hello From the server side!');
});

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
