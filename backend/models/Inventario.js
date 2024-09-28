import { DataTypes } from 'sequelize';
import sequelize from '../db.js';


const Inventario = sequelize.define('Inventario', {
  id_inventario: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  id_producto_base: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_empresa: {
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
  id_reponedor: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'inventario', // Especifica el nombre de la tabla aquí
  timestamps: false, // Deshabilita la creación de las columnas `createdAt` y `updatedAt`  
  });


export default Inventario;