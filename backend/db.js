import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Desabilita las consultas SQL en consola
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      : {}
  }
);

export default sequelize;
