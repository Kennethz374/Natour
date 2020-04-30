const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express(); // add methods to app

// 1) middleware
app.use(morgan('dev')); // logging req ex: GET /api/v1/tours 200 19.412 ms - 8681
app.use(express.json()); //need this middleware to access the "req.body"

app.use((req, res, next) => {
  console.log('Hello from the middleware  👽');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) route handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
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

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: `this route is not yet defined` });
};
const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: `this route is not yet defined` });
};
const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: `this route is not yet defined` });
};
const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: `this route is not yet defined` });
};
const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: `this route is not yet defined` });
};

//3) routes
const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/tours', userRouter);

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route(`/:id`)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter
  .route(`/api/v1/users`)
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route(`/api/v1/users/:id`)
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//4) start server
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
