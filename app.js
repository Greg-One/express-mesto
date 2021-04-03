const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const usersRoute = require('./routes/users');
const cardRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/', usersRoute, cardRoute);

app.use(helmet());
app.disable('x-powered-by');

app.listen(PORT, () => {
  console.log(`Server starts on port ${PORT}`);
});
