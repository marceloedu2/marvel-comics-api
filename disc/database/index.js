"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDatabase = void 0;

var _typeorm = require("typeorm");

const connectDatabase = async () => {
  return await (0, _typeorm.createConnection)({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    useUnifiedTopology: true,
    entities: ['./src/schemas/*.*']
  });
};

exports.connectDatabase = connectDatabase;
connectDatabase().then(() => {
  console.log('DataBase Connected!!!');
}).catch(e => {
  console.log('=> ' + e);
});