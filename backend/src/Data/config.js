require("dotenv").config();

const config = {
  APP_PORT: process.env.APP_PORT,
  MONGODB_USERNAME: process.env.MONGODB_USERNAME,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_CONNECTIONSTRING: process.env.MONGODB_CONNECTIONSTRING,
};

module.exports = config;
