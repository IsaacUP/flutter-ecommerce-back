"use strict";

var _express = _interopRequireDefault(require("express"));

var _expressGraphql = require("express-graphql");

var _schema = _interopRequireDefault(require("./graphql/schema"));

var _database = require("./database");

var _dotenv = require("dotenv");

var _isAuth = _interopRequireDefault(require("./middleware/is-auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();
var app = (0, _express["default"])();
(0, _database.connect)();
app.use(_isAuth["default"]);
app.use('/', (0, _expressGraphql.graphqlHTTP)({
  graphiql: true,
  schema: _schema["default"]
}));
var port = process.env.PORT;
app.listen(port, function () {
  return console.log("Server on port ".concat(port));
});
//# sourceMappingURL=index.js.map