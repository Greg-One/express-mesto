const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      res.status(500).send({ message: `Error occured: ${err}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).send({ message: `Error occured: ${err}` });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).send({ message: `Error occured: ${err}` });
    });
};

const addCardLike = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).send({ message: `Error occured: ${err}` });
    });
};

const removeCardLike = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      res.status(500).send({ message: `Error occured: ${err}` });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
