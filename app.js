const express = require('express');

const app = express(); // add methods to app

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello From the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send(`You can post to this endpoint...`);
});
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
