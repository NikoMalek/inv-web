import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Default_Product = sequelize.define("Default_Product", {
  ID_PRODUCT_DEFAULT: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  NAME_PRODUCT: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DESCRIPTION_PRODUCT: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IMAGE_PRODUCT: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  BARCODE: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    tableName: "default_product",
    timestamps: false,
  });

export default Default_Product;