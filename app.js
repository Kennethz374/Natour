const fs = require('fs');
const express = require('express');

const app = express(); // add methods to app

app.use(express.json()); //need this middleware to access the "req.body"

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello From the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('you can post to this endpoint');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours: tours } });
});

app.post(`/api/v1/tours`, (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  res.send(`Done`);
});
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
