// const jwt = require('jsonwebtoken');
// const AuthorisationError = require('../errors/authorisation-error');

// const { JWT_SECRET, NODE_ENV } = process.env;

// const auth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'such-key');
//   } catch (err) {
//     next(new AuthorisationError('Authorisation error'));
//   }

//   req.user = payload;
//   next();
// };

// module.exports = auth;

const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/authorisation-error');

const { JWT_SECRET = 'dev-secret' } = process.env;

function auth(req, res, next) {
  try {
    const payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthorisationError('Неправильный токен авторизации'));
  }
}

module.exports = auth;
