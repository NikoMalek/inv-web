import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Producto_Base = sequelize.define("Producto_Base", {
  ID_PRODUCTO_BASE: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  NOMBRE_PRODUCTO: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DESCRIPCION_PRODUCTO: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IMAGEN_PRODUCTO: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CODIGO_BARRA: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    tableName: "producto_base",
    timestamps: false,
  });

export default Producto_Base;