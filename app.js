const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/', usersRoute);

app.listen(PORT, () => {
  console.log(`Server starts on port ${PORT}`);
});
