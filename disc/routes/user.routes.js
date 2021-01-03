"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _AuthenticateController = _interopRequireDefault(require("../controllers/AuthenticateController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = (0, _express.Router)();
const userController = new _UserController.default();
const authenticateController = new _AuthenticateController.default();
userRouter.post('/register', userController.create);
userRouter.post('/login', authenticateController.execute);
userRouter.put('/', _ensureAuthenticated.default, userController.update);
var _default = userRouter;
exports.default = _default;