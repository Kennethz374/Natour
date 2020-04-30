const fs = require('fs');
const express = require('express');

const app = express(); // add methods to app

app.use(express.json()); //need this middleware to access the "req.body"

//next function in third argument
//middleware will touch every single request because we didn't specific any routes

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

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app.use((req, res, next) => {
  console.log('Hello from the middleware  👽');
  next();
});

app
  .route(`/api/v1/tours/:id`)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
