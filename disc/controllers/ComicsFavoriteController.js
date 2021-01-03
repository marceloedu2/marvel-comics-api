"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ComicsFavoritesServices = _interopRequireDefault(require("../services/ComicsFavoritesServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ComicsFavoritesController {
  async create(request, response) {
    const comicsServices = new _ComicsFavoritesServices.default();
    const userId = request.user.id;
    const {
      id,
      title,
      description,
      published,
      url,
      detail
    } = request.body;
    await comicsServices.create({
      comicId: id,
      userId,
      title,
      description,
      published,
      url,
      detail
    });
    response.status(200).send();
  }

  async list(request, response) {
    const comicsServices = new _ComicsFavoritesServices.default();
    const userId = request.user.id;
    const favorites = await comicsServices.list({
      userId
    });
    response.json(favorites);
  }

  async remove(request, response) {
    const comicsServices = new _ComicsFavoritesServices.default();
    const userId = request.user.id;
    const {
      id
    } = request.params;
    const favorites = await comicsServices.remove({
      userId,
      comicId: Number(id)
    });
    response.json(favorites);
  }

}

var _default = ComicsFavoritesController;
exports.default = _default;