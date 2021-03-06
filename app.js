const express = require('express');
const morgan = require('morgan');

const tourRouter = require(`./routes/tourRoutes`);
const userRouter = require(`./routes/userRoutes`);

const app = express(); // add methods to app

// 1) middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // logging req ex: GET /api/v1/tours 200 19.412 ms - 8681
}
app.use(express.json()); //need this middleware to access the "req.body"

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3) routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
