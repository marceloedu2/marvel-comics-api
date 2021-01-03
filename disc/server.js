"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("express-async-errors");

var _routes = _interopRequireDefault(require("./routes"));

require("reflect-metadata");

require("./database");

var _AppError = _interopRequireDefault(require("./erros/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.default);
app.use((error, request, response, next) => {
  if (error instanceof _AppError.default) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error(error);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});
app.listen(3333, () => {
  console.log('✔ connected to server, port: 3333');
});