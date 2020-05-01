const express = require('express');
const morgan = require('morgan');

const tourRouter = require(`./routes/tourRoutes`);
const userRouter = require(`./routes/userRoutes`);

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

//3) routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4) start server
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
