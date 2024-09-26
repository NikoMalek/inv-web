import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rut : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users', // Especifica el nombre de la tabla aquí
  timestamps: false, // Deshabilita la creación de las columnas `createdAt` y `updatedAt`
});

export default User;