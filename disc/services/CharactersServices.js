"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiMarvelConfig = _interopRequireDefault(require("../config/apiMarvelConfig"));

var _AppError = _interopRequireDefault(require("../erros/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CharactersServices {
  async list({
    offset
  }) {
    const {
      data: charactersData
    } = await _apiMarvelConfig.default.get('/v1/public/characters', {
      params: {
        offset,
        orderBy: 'modified'
      }
    });

    if (!charactersData) {
      throw new _AppError.default('Characters not found.');
    }

    const characters = charactersData.data.results?.map(character => {
      return {
        id: character.id,
        name: character.name,
        description: character.description,
        modified: character.modified,
        url: `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`
      };
    });
    const currentPage = charactersData.data.offset;
    delete charactersData.data.results;
    delete charactersData.data.offset;
    return { ...charactersData.data,
      currentPage,
      maxPages: parseInt(String(charactersData.data.total / charactersData.data.limit)),
      characters
    };
  }

  async index({
    name: nameDate
  }) {
    const {
      data: characterData
    } = await _apiMarvelConfig.default.get('/v1/public/characters', {
      params: {
        orderBy: 'modified',
        name: nameDate
      }
    });

    if (!characterData) {
      throw new _AppError.default('CharacterFavorite not found.');
    }

    return characterData.data.results.map(character => {
      return {
        id: character.id,
        name: character.name,
        description: character.description,
        url: `${character.thumbnail?.path}/portrait_uncanny.${character.thumbnail?.extension}`
      };
    });
  }

}

var _default = CharactersServices;
exports.default = _default;