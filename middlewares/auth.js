const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/forbidden-error');

const { JWT_SECRET = 'such-key' } = process.env;

const auth = (req, res, next) => {
  // const token = req.cookies.jwt;
  // let payload;

  try {
    // payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'such-key');
    // payload = jwt.verify(token, JWT_SECRET);
    const payload = jwt.verify(req.cookies.jwt, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new ForbiddenError('Authorisation error.'));
  }
};

module.exports = auth;
