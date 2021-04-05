const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const auth = require('./middlewares/auth');
const usersRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const { createUser, loginUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signup', createUser);
app.post('/signin', loginUser);

app.use('/users', auth, usersRoute);
app.use('/cards', auth, cardRoute);

app.use(helmet());
app.disable('x-powered-by');

app.listen(PORT, () => {
  console.log(`Server starts on port ${PORT}`);
});
