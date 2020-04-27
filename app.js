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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //convert string to numbe by time 1
  const tour = tours.find(el => {
    el.id === req.params;
  });
  res.status(200).json({
    status: 'success'
    // result: tours.length, data: { tours: tours }
  });
});

app.post(`/api/v1/tours`, (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        result: tours.length,
        data: { tour: newTour }
      });
    }
  );
});

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
