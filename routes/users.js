const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  loginUser,
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', loginUser);

router.get('/users/:userId', getUserById);
router.get('/users', getUsers);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
