const Card = require('../models/card');
const ValidationError = require('../errors/validation-error');
const ServerError = require('../errors/server-error');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      throw new ServerError(`Server error: ${err}`);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Validation error');
      } else {
        throw new ServerError(`Server error: ${err}`);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('You have no permission to delete other users cards');
      }

      Card.findByIdAndDelete(cardId)
        .catch(next);
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Wrong card Id');
      } else {
        throw new ServerError(`Server error: ${err}`);
      }
    })
    .catch(next);
};

const addCardLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Card not found');
      } else if (err.name === 'CastError') {
        throw new CastError('Wrong card Id');
      } else {
        throw new ServerError(`Server error: ${err}`);
      }
    })
    .catch(next);
};

const removeCardLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Card not found');
      } else if (err.name === 'CastError') {
        throw new CastError('Wrong card Id');
      } else {
        throw new ServerError(`Server error: ${err}`);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
