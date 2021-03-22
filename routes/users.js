const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

router.post('/users', createUser);
router.get('/users/:userId', getUserById);
router.get('/users', getUsers);

module.exports = router;
