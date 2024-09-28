import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'postgres',
  port: process.env.MYSQL_PORT,
  logging: false, // Deshabilita los logs de las consultas SQL

});
export default sequelize;