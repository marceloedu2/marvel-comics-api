"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ComicsServices = _interopRequireDefault(require("../services/ComicsServices"));

var _ComicsFavoritesServices = _interopRequireDefault(require("../services/ComicsFavoritesServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ComicsController {
  async list(request, response) {
    const userId = request.user.id;
    const {
      page = 0
    } = request.body;
    const comicsFavoritesServices = new _ComicsFavoritesServices.default();
    const comicsServices = new _ComicsServices.default();
    const favorites = await comicsFavoritesServices.list({
      userId
    });
    const comics = await comicsServices.list({
      offset: page
    });
    const comicsList = await comics.comics.map(comic => {
      return { ...comic,
        liked: !!favorites.find(favorite => favorite.comicId === comic.id)
      };
    });
    response.json({ ...comics,
      comics: comicsList
    });
  }

  async search(request, response) {
    const userId = request.user.id;
    const {
      title
    } = request.body;
    const comicsFavoritesServices = new _ComicsFavoritesServices.default();
    const comicsServices = new _ComicsServices.default();
    const favorites = await comicsFavoritesServices.list({
      userId
    });
    const comics = await comicsServices.search({
      title
    });
    const comicsList = await comics.map(comic => {
      return { ...comic,
        liked: !!favorites.find(favorite => favorite.comicId === comic.id)
      };
    });
    response.json(comicsList);
  }

}

var _default = ComicsController;
exports.default = _default;