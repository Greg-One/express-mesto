const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(res.status(403).send({ message: 'Authorisation error' }));
  }

  req.user = payload;
  next();
};

module.exports = auth;
