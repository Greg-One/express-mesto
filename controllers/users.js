const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(500).send({ message: `Error occured: ${err}` });
    });
};

const getUserById = (req, res) => {
  const { id } = req.user._id;

  User.findById(id).then((user) => res.status(200).send(user));
  // .catch((err) => {
  //   res.status(500).send({ message: `Error occured: ${err}` });
  // });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send({ message: `Error occured: ${err}` }));
};

module.exports = { getUsers, getUserById, createUser };
