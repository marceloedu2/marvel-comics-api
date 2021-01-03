"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CharactersFavoritesServices = _interopRequireDefault(require("../services/CharactersFavoritesServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CharactersFavoritesController {
  async create(request, response) {
    const charactersServices = new _CharactersFavoritesServices.default();
    const userId = request.user.id;
    const {
      id,
      name,
      description,
      detail,
      url
    } = request.body;
    await charactersServices.create({
      id,
      userId,
      name,
      description,
      detail,
      url
    });
    response.status(200).send();
  }

  async list(request, response) {
    const charactersServices = new _CharactersFavoritesServices.default();
    const userId = request.user.id;
    const favorites = await charactersServices.list({
      userId
    });
    response.json(favorites);
  }

  async remove(request, response) {
    const charactersServices = new _CharactersFavoritesServices.default();
    const userId = request.user.id;
    const {
      id
    } = request.params;
    const favorites = await charactersServices.remove({
      userId,
      characterId: Number(id)
    });
    response.json(favorites);
  }

}

var _default = CharactersFavoritesController;
exports.default = _default;