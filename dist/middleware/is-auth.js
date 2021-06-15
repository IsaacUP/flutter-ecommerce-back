"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (req, res, next) {
  var authHeader = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  var token = authHeader.split(' ')[1];

  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  var decodedToken;

  try {
    decodedToken = _jsonwebtoken["default"].verify(token, process.env.JWT_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
//# sourceMappingURL=is-auth.js.map