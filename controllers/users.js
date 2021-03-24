const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ message: `Error occurred: ${err}` });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'NotValidId') {
        res.status(404).send({ message: 'User not found' });
      } else {
        res.status(500).send({ message: `Error occurred: ${err}` });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation error' });
      } else {
        res.status(500).send({ message: `Error occurred: ${err}` });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const { id } = req.user._id;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'NotValidId') {
        res.status(404).send({ message: 'User not found' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation error' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Wrong user Id' });
      } else {
        res.status(500).send({ message: `Error occurred: ${err}` });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { id } = req.user._id;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'NotValidId') {
        res.status(404).send({ message: 'User not found' });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Validation error' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Wrong user Id' });
      } else {
        res.status(500).send({ message: `Error occurred: ${err}` });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
