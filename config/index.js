require('dotenv').config();

const { PORT, LOG_FORMAT, LOG_DIR, ORIGIN, CREDENTIALS, NODE_ENV } = process.env;

// DATABASE 
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

//Redis

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env

//cache URl

const {CACHE_URL} = process.env

//Key

const{KEY}= process.env

module.exports = {
  PORT,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  CREDENTIALS,
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  CACHE_URL,
  KEY
};


