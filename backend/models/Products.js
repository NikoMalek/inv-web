import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Producto_Base = sequelize.define("Producto_Base", {
  id_producto_base: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  nombre_producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion_producto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imagen_producto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  codigo_barra: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    tableName: "producto_base",
    timestamps: false,
  });

export default Producto_Base;