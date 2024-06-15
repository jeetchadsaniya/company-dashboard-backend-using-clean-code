const { Sequelize } = require("sequelize"); 
const { Umzug, SequelizeStorage } = require("umzug");
require("dotenv").config();

const sequelize = new Sequelize({
  database: `${process.env.DB_NAME}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  host: `${process.env.DB_HOST}`,
  dialect: 'mysql',
  port: parseInt(process.env.DB_PORT),
  pool: {
    max: 10,
    min: 2,  
    idle: 10000,
  },
});


const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

umzug.up(); 