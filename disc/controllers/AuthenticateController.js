"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthenticateServices = _interopRequireDefault(require("../services/AuthenticateServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthenticateController {
  async execute(request, response) {
    const {
      email,
      password
    } = request.body;
    const authenticateUser = new _AuthenticateServices.default();
    const {
      user,
      token
    } = await authenticateUser.execute({
      email,
      password
    });
    return response.json({
      user,
      token
    });
  }

}

var _default = AuthenticateController;
exports.default = _default;