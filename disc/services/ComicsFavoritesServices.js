"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../erros/AppError"));

var _typeorm = require("typeorm");

var _comicFavorite = _interopRequireDefault(require("../schemas/comicFavorite"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ComicsFavoritesServices {
  async create({
    comicId,
    userId,
    title,
    description,
    published,
    detail,
    url
  }) {
    const characterRepository = (0, _typeorm.getRepository)(_comicFavorite.default);
    const checkCharacterExists = await characterRepository.findOne({
      where: {
        comicId,
        userId
      }
    });

    if (checkCharacterExists) {
      throw new _AppError.default('CharacterFavorite already exists as a favorite.');
    }

    const comic = characterRepository.create({
      comicId,
      userId,
      title,
      description,
      published,
      detail,
      url
    });
    return await characterRepository.save(comic);
  }

  async list({
    userId
  }) {
    const comicsRepository = (0, _typeorm.getRepository)(_comicFavorite.default);
    return await comicsRepository.find({
      where: {
        userId
      }
    });
  }

  async remove({
    userId,
    comicId
  }) {
    const comicsRepository = (0, _typeorm.getRepository)(_comicFavorite.default);
    const comic = await comicsRepository.find({
      where: {
        userId,
        comicId
      }
    });

    if (comic.length === 0) {
      throw new _AppError.default('CharacterFavorite don`t exist as a favorite.');
    }

    await comicsRepository.remove(comic);
  }

}

var _default = ComicsFavoritesServices;
exports.default = _default;