"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("./user.routes"));

var _comics = _interopRequireDefault(require("./comics.router"));

var _characters = _interopRequireDefault(require("./characters.router"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/user', _user.default);
routes.use(_ensureAuthenticated.default);
routes.use('/comics', _comics.default);
routes.use('/characters', _characters.default);
var _default = routes;
exports.default = _default;