const app = require('./app');

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});