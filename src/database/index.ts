import { Connection, createConnection } from 'typeorm';

export const connectDatabase = async (): Promise<Connection> => {
  const connection = await createConnection();

  console.log(connection.options.entities);

  return connection;
};

connectDatabase()
  .then(connection => {
    console.log(connection);
  })
  .catch(e => {
    console.log('=> ' + e);
  });
