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
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
//notes for MVC model in express
//MVC MODEL part 2
//BUSINESS LOGIC VS APP LOGIC
//out of town
