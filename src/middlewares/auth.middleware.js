const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const CustomError = require('../helpers/custom-error.helper');

module.exports = function(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) throw new CustomError(400, "Token debe ser enviado");

  jwt.verify(token, JWT_SECRET, function(err, decodedToken) {
    if (err) throw new CustomError(401, "Token invalido");
    req.user = decodedToken.user;
    next();
  })
}