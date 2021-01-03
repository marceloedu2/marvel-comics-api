"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiMarvelConfig = _interopRequireDefault(require("../config/apiMarvelConfig"));

var _AppError = _interopRequireDefault(require("../erros/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ComicsServices {
  async list({
    offset
  }) {
    const {
      data: comicsData = []
    } = await _apiMarvelConfig.default.get('/v1/public/comics', {
      params: {
        offset,
        orderBy: 'focDate'
      }
    });
    const comics = await comicsData.data.results.map(comic => {
      return {
        id: comic.id,
        title: comic.title,
        description: comic.description,
        published: comic.dates[0].date,
        url: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
      };
    });
    const currentPage = comicsData.data.offset;
    comicsData.data.results = '';
    delete comicsData.data.results;
    delete comicsData.data.offset;
    return { ...comicsData.data,
      currentPage,
      maxPages: parseInt(String(comicsData.data.total / comicsData.data.limit)),
      comics
    };
  }

  async search({
    title: titleDate
  }) {
    const {
      data: comicsData
    } = await _apiMarvelConfig.default.get('/v1/public/comics', {
      params: {
        orderBy: 'modified',
        title: titleDate
      }
    });

    if (!comicsData) {
      throw new _AppError.default('Comic not found.');
    }

    return comicsData.data.results.map(comic => {
      return {
        id: comic.id,
        title: comic.title,
        description: comic.description,
        url: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
      };
    });
  }

}

var _default = ComicsServices;
exports.default = _default;