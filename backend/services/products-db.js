import Producto_Base from "../models/Products.js";
import crypto from 'crypto';
import { errorMessages } from '../errorvalidation.js';
import { InventarioDB } from './inventario-db.js';


export class ProductDB {
  static async create ({ nombre , description, imagen, codigoBarras, id_empresa, precio, cantidad, ultima_actualizacion, id_reponedor }) {
    
    const product = await Producto_Base.findOne({ where: { codigo_barra: codigoBarras } });
    if (product) {
      await InventarioDB.create({ id_producto_base: product.id_producto_base, id_empresa, precio, cantidad, ultima_actualizacion, id_reponedor });
      return product.id_producto_base;
    }

    const id = crypto.randomUUID()

    await Producto_Base.create({
      id_producto_base: id,
      nombre_producto: nombre,
      descripcion_producto: description,
      imagen_producto: imagen,
      codigo_barra: codigoBarras
    });

    await InventarioDB.create({ id_producto_base: id, id_empresa, precio, cantidad, ultima_actualizacion, id_reponedor });
    
    return id

  }
  static async get ({ codigo_barra }) {

    const product = await Producto_Base.findOne({ where: { codigo_barra } });
    if (!product) { throw new Error(errorMessages.productoNoExiste) }
    
    product.dataValues = {
      id: product.id_producto_base,
      nombre: product.nombre_producto,
      description: product.descripcion_producto,
      imagen: product.imagen_producto,
      codigoBarras: product.codigo_barra
    }
    return product

  }

  static async getbyId ({ id_producto_base }) {
    console.log("EL ID ES: ", id_producto_base);
    const product = await Producto_Base.findOne({ where: { id_producto_base } });
    if (!product) { throw new Error(errorMessages.productoNoExiste) }

    return {
      id: product.id_producto_base,
      nombre: product.nombre_producto,
      description: product.descripcion_producto,
      imagen: product.imagen_producto,
      codigoBarras: product.codigo_barra
    }
  }
}