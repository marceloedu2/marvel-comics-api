"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

var _user = _interopRequireDefault(require("../schemas/user"));

var _AppError = _interopRequireDefault(require("../erros/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserService {
  async create({
    name,
    email,
    password
  }) {
    const userRepository = (0, _typeorm.getRepository)(_user.default);
    const checkUserExists = await userRepository.findOne({
      where: {
        email
      }
    });

    if (checkUserExists) {
      throw new _AppError.default('Email address already used.');
    }

    const hashedPassword = await (0, _bcryptjs.hash)(String(password), 10);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });
    await userRepository.save(user);
    delete user.password;
    return user;
  }

  async update({
    id,
    name,
    email,
    oldPassword,
    password
  }) {
    const userRepository = (0, _typeorm.getRepository)(_user.default);

    if (!id) {
      throw new _AppError.default('User not found');
    }

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new _AppError.default('User not found');
    }

    const userWithUpdatedEmail = await userRepository.findOne({
      where: {
        email
      }
    });

    if (userWithUpdatedEmail) {
      throw new _AppError.default('E-mail already in use');
    }

    if (password && !oldPassword) {
      throw new _AppError.default('OldPassword is required');
    }

    if (password && oldPassword) {
      const checkIldPassword = await (0, _bcryptjs.compare)(oldPassword, String(user.password));

      if (!checkIldPassword) {
        throw new _AppError.default('OldPassword does not match');
      }
    }

    let hashedPassword = '';

    if (password) {
      hashedPassword = await (0, _bcryptjs.hash)(String(password), 10);
    }

    await userRepository.update(id, {
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword || user.password
    });
    const userUpdated = await userRepository.findOne(id);
    delete userUpdated?.password;
    return userUpdated;
  }

}

var _default = UserService;
exports.default = _default;