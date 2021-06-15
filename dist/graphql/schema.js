"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTools = require("graphql-tools");

var _resolvers = require("./resolvers");

var typeDefs = "\n    type Query{\n        users: [User]\n        user(_id : ID!): User\n    }\n\n    type Mutation{\n        createUser(input: UserInput): User\n        deleteUser(_id: ID): User\n        updateUser(_id: ID, input: UserInput): User\n        login(email:String!, password:String!): AuthData\n    }\n\n    type User{\n        _id: ID!\n        firstName: String!\n        lastName: String!\n        userName: String!\n        profilePic: String\n        email: String!\n        phone: String\n        password: String\n        status: String\n    }\n\n    input UserInput{\n        firstName: String!\n        lastName: String!\n        userName: String!\n        profilePic: String\n        email: String!\n        phone: String\n        password: String!\n    }\n    \n    type AuthData {\n        userId: ID!\n        token: String!\n    }\n";

var _default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: typeDefs,
  resolvers: _resolvers.resolvers
});

exports["default"] = _default;
//# sourceMappingURL=schema.js.map