const router = require('express').Router();
const { getUsers, createUser } = require('../controllers/users');

router.post('/users', createUser);
router.get('/users', getUsers);

module.exports = router;
