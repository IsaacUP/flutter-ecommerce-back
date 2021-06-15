"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var resolvers = {
  Query: {
    users: function users(_, _ref, ctx) {
      _objectDestructuringEmpty(_ref);

      if (!ctx.isAuth) {
        throw new Error('Unautheticated!');
      }

      return _User["default"].find();
    },
    user: function user(_, _ref2, ctx) {
      var _id = _ref2._id;
      return ctx.isAuth ? _User["default"].findById(_id) : new Error('Unautheticated');
    }
  },
  Mutation: {
    createUser: function createUser(_, _ref3) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var input, newUser;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                input = _ref3.input;

                _User["default"].exists();

                _context.next = 4;
                return _bcryptjs["default"].hash(input.password, 12);

              case 4:
                input.password = _context.sent;
                newUser = new _User["default"](input);
                _context.next = 8;
                return newUser.save();

              case 8:
                newUser.password = null;
                return _context.abrupt("return", newUser);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    deleteUser: function deleteUser(_, _ref4, ctx) {
      var _id = _ref4._id;
      return ctx.isAuth ? _User["default"].findByIdAndDelete(_id) : new Error('Unautheticated!');
      ;
    },
    updateUser: function updateUser(_, _ref5, ctx) {
      var _id = _ref5._id,
          input = _ref5.input;
      return ctx.isAuth ? _User["default"].findByIdAndUpdate(_id, input, {
        "new": true
      }) : new Error('Unautheticated');
    },
    login: function login(_, _ref6) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var email, password, user, isEqual, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                email = _ref6.email, password = _ref6.password;
                _context2.next = 3;
                return _User["default"].findOne({
                  email: email
                });

              case 3:
                user = _context2.sent;

                if (user) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('Invalid Credentials!');

              case 6:
                if (!(user.status === 'Pending')) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", new Error('Pending Account. Please Verify Your Email!'));

              case 8:
                _context2.next = 10;
                return _bcryptjs["default"].compare(password, user.password);

              case 10:
                isEqual = _context2.sent;

                if (isEqual) {
                  _context2.next = 13;
                  break;
                }

                throw new Error('Invalid Credentials!');

              case 13:
                token = _jsonwebtoken["default"].sign({
                  userId: user.id,
                  email: user.email
                }, process.env.JWT_KEY, {
                  expiresIn: '1h'
                });
                return _context2.abrupt("return", {
                  userId: user.id,
                  token: token
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  }
};
exports.resolvers = resolvers;
//# sourceMappingURL=resolvers.js.map