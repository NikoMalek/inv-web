import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Empresa = sequelize.define('Empresa', {
  id_empresa: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nombre_empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'empresas', // Especifica el nombre de la tabla aquí
  timestamps: false, // Deshabilita la creación de las columnas `createdAt` y `updatedAt`
});
  
export default Empresa;