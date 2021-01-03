"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserService = _interopRequireDefault(require("../services/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const createUser = new _UserService.default();
    const user = await createUser.create({
      name,
      email,
      password
    });
    return response.json(user);
  }

  async update(request, response) {
    const updateUser = new _UserService.default();
    const {
      id,
      email,
      name,
      password,
      oldPassword
    } = request.body;
    const user = await updateUser.update({
      id,
      email,
      name,
      password,
      oldPassword
    });
    return response.json(user);
  }

}

var _default = UserController;
exports.default = _default;