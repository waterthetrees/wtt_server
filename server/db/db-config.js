/**
 * https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax
 */
import dotenv from 'dotenv';
dotenv.config();

const devEnv = process.env.NODE_ENV === 'test' ? 'test' : 'local';

const dbConfig = {
  test: {
    host: process.env.POSTGRES_HOST_TEST,
    port: process.env.POSTGRES_PORT_TEST,
    database: process.env.POSTGRES_DB_TEST,
    user: process.env.POSTGRES_USER_TEST,
    password: process.env.POSTGRES_PASSWORD_TEST,
  },
  local: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
}[devEnv];
export default dbConfig;
