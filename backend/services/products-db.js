import Producto_Base from "../models/Products.js";
import crypto from 'crypto';
import { errorMessages } from '../errorvalidation.js';
import { InventarioDB } from './inventario-db.js';


export class ProductDB {
  static async create ({ nombre , description, imagen, codigoBarras, ID_EMPRESA, precio, cantidad, ultima_actualizacion, ID_REPONEDOR }) {
    
    const product = await Producto_Base.findOne({ where: { CODIGO_BARRA: codigoBarras } });
    if (product) {
      await InventarioDB.create({ ID_PRODUCTO_BASE: product.ID_PRODUCTO_BASE, ID_EMPRESA, precio, cantidad, ultima_actualizacion, ID_REPONEDOR });
      throw new Error(errorMessages.productoYaExiste)
    }

    const id = crypto.randomUUID()

    await Producto_Base.create({
      ID_PRODUCTO_BASE: id,
      NOMBRE_PRODUCTO: nombre,
      DESCRIPCION_PRODUCTO: description,
      IMAGEN_PRODUCTO: imagen,
      CODIGO_BARRA: codigoBarras
    });

    await InventarioDB.create({ ID_PRODUCTO_BASE: id, ID_EMPRESA, precio, cantidad, ultima_actualizacion, ID_REPONEDOR });
    
    return id

  }
  static async get ({ CODIGO_BARRA }) {

    const product = await Producto_Base.findOne({ where: { CODIGO_BARRA } });
    if (!product) { throw new Error(errorMessages.productoNoExiste) }
    
    product.dataValues = {
      id: product.ID_PRODUCTO_BASE,
      nombre: product.NOMBRE_PRODUCTO,
      description: product.DESCRIPCION_PRODUCTO,
      imagen: product.IMAGEN_PRODUCTO,
      codigoBarras: product.CODIGO_BARRA
    }
    return product

  }
}