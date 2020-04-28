const fs = require('fs');
const express = require('express');

const app = express(); // add methods to app

app.use(express.json()); //need this middleware to access the "req.body"

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours: tours }
  });
};

app.get('/api/v1/tours', getAllTours);

app.get('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour }
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

app.patch(`/api/v1/tours/:id`, (req, res) => {
  if (Number(req.params.id > tours.length)) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here.......'
    }
  });
});

app.delete(`/api/v1/tours/:id`, (req, res) => {
  if (Number(req.params.id > tours.length)) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID'
    });
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
