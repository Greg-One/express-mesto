const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/users/:userId', getUserById);
router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
