"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CharactersServices = _interopRequireDefault(require("../services/CharactersServices"));

var _CharactersFavoritesServices = _interopRequireDefault(require("../services/CharactersFavoritesServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CharactersController {
  async list(request, response) {
    const charactersServices = new _CharactersServices.default();
    const charactersFavoritesServices = new _CharactersFavoritesServices.default();
    const userId = request.user.id;
    const {
      page = 0
    } = request.body;
    const favorites = await charactersFavoritesServices.list({
      userId
    });
    const characters = await charactersServices.list({
      offset: page
    });
    const charactersList = await characters.characters.map(characters => {
      return { ...characters,
        liked: !!favorites.find(favorite => favorite.characterId === characters.id)
      };
    });
    response.json({ ...characters,
      characters: charactersList
    });
  }

  async search(request, response) {
    const charactersServices = new _CharactersServices.default();
    const charactersFavoritesServices = new _CharactersFavoritesServices.default();
    const userId = request.user.id;
    const {
      name
    } = request.body;
    const favorites = await charactersFavoritesServices.list({
      userId
    });
    const characters = await charactersServices.index({
      name
    });
    const charactersList = await characters.map(characters => {
      return { ...characters,
        liked: !!favorites.find(favorite => favorite.characterId === characters.id)
      };
    });
    response.json(charactersList);
  }

}

var _default = CharactersController;
exports.default = _default;