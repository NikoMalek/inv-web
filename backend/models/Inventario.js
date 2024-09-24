import { DataTypes } from 'sequelize';
import sequelize from '../db.js';


const Inventario = sequelize.define('Inventario', {
  ID_INVENTARIO: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ID_PRODUCTO_BASE: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ID_EMPRESA: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ultima_actualizacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ID_REPONEDOR: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'inventario', // Especifica el nombre de la tabla aquí
  timestamps: false, // Deshabilita la creación de las columnas `createdAt` y `updatedAt`  
  });


export default Inventario;