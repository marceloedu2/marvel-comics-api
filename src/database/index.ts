import { Connection, createConnection } from 'typeorm';

export const connectDatabase = async (): Promise<Connection> => {
  return await createConnection({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    useUnifiedTopology: true,
    entities: ['./src/schemas/*.*'],
  });
};

connectDatabase()
  .then(() => {
    console.log('DataBase Connected!!!');
  })
  .catch(e => {
    console.log('=> ' + e);
  });
