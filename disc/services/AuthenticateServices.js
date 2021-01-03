"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _user = _interopRequireDefault(require("../schemas/user"));

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../config/auth"));

var _AppError = _interopRequireDefault(require("../erros/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthenticateServices {
  async execute({
    email,
    password
  }) {
    const userRepository = (0, _typeorm.getRepository)(_user.default);
    const user = await userRepository.findOne({
      email
    });

    if (!user) {
      throw new _AppError.default('Incorrect email/password combination.');
    }

    const passwordMarched = await (0, _bcryptjs.compare)(password, String(user.password));
    delete user.password;

    if (!passwordMarched) {
      throw new _AppError.default('Incorrect email/password combination.');
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt.secrete, {
      subject: String(user.id),
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }

}

var _default = AuthenticateServices;
exports.default = _default;