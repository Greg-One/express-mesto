const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', addCardLike);
router.delete('/:cardId/likes', removeCardLike);

module.exports = router;
