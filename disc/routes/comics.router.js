"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ComicsController = _interopRequireDefault(require("../controllers/ComicsController"));

var _ComicsFavoriteController = _interopRequireDefault(require("../controllers/ComicsFavoriteController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const comicsRouter = (0, _express.Router)();
const comicsController = new _ComicsController.default();
const comicsFavoriteController = new _ComicsFavoriteController.default();
comicsRouter.post('/', comicsController.list);
comicsRouter.post('/search', comicsController.search);
comicsRouter.get('/favorite', comicsFavoriteController.list);
comicsRouter.post('/favorite', comicsFavoriteController.create);
comicsRouter.put('/favorite/:id', comicsFavoriteController.remove);
var _default = comicsRouter;
exports.default = _default;