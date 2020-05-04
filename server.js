const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

console.log(app.get('env')); // this will allow you to see what env you in

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
