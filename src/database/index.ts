import { Connection, createConnection } from 'typeorm';

export const connectDatabase = async (): Promise<Connection> => {
  return await createConnection();
};

connectDatabase().catch(e => {
  console.log('=> ' + e);
});
