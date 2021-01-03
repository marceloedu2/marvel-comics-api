"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = _axios.default.create({
  baseURL: process.env.MARVEL_API_URL,
  params: {
    ts: 1,
    apikey: process.env.MARVEL_API_PUBLIC_KEY,
    hash: (0, _md.default)(`1${process.env.MARVEL_API_PRIVATE_KEY}${process.env.MARVEL_API_PUBLIC_KEY}`)
  }
});

var _default = api;
exports.default = _default;