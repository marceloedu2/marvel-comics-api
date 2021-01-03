"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CharactersController = _interopRequireDefault(require("../controllers/CharactersController"));

var _CharactersFavoriteController = _interopRequireDefault(require("../controllers/CharactersFavoriteController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const charactersRouter = (0, _express.Router)();
const charactersController = new _CharactersController.default();
const charactersFavoriteController = new _CharactersFavoriteController.default();
charactersRouter.post('/', charactersController.list);
charactersRouter.post('/search', charactersController.search);
charactersRouter.get('/favorite', charactersFavoriteController.list);
charactersRouter.post('/favorite', charactersFavoriteController.create);
charactersRouter.put('/favorite/:id', charactersFavoriteController.remove);
var _default = charactersRouter;
exports.default = _default;