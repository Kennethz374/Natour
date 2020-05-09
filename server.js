const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection successful');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true
  }, //schema type options
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'A tour must have a price'] }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'the Park camper',
  // rating: 4.7,
  price: 997
});

testTour
  .save() //save data to database
  .then(doc => {
    console.log(doc);
  })
  .catch(err => console.log('ERRRRRRRRROR', err));

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
//notes for MVC model in express
