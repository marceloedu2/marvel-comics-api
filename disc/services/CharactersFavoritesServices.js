"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../erros/AppError"));

var _typeorm = require("typeorm");

var _characterFavorite = _interopRequireDefault(require("../schemas/characterFavorite"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CharactersServices {
  async create({
    id,
    userId,
    name,
    description,
    detail,
    url
  }) {
    const characterRepository = (0, _typeorm.getRepository)(_characterFavorite.default);
    const checkCharacterExists = await characterRepository.findOne({
      where: {
        characterId: id,
        userId
      }
    });

    if (checkCharacterExists) {
      throw new _AppError.default('CharacterFavorite already exists as a favorite.');
    }

    const user = characterRepository.create({
      characterId: id,
      userId,
      name,
      description,
      detail,
      url
    });
    await characterRepository.save(user);
  }

  async list({
    userId
  }) {
    const characterRepository = (0, _typeorm.getRepository)(_characterFavorite.default);
    return await characterRepository.find({
      where: {
        userId
      }
    });
  }

  async remove({
    userId,
    characterId
  }) {
    const characterRepository = (0, _typeorm.getRepository)(_characterFavorite.default);
    const character = await characterRepository.find({
      where: {
        userId,
        characterId
      }
    });

    if (character.length === 0) {
      throw new _AppError.default('CharacterFavorite don`t exist as a favorite.');
    }

    await characterRepository.remove(character);
  }

}

var _default = CharactersServices;
exports.default = _default;