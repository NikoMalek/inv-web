import Inventario from '../models/Inventario.js';
import crypto from 'crypto';
import { errorMessages } from '../errorvalidation.js';

export class InventarioDB {
  static async create({ id_producto_base, id_empresa, precio, cantidad, ultima_actualizacion, id_reponedor }) {
    const id = crypto.randomUUID();


    const product = await Inventario.findOne({ where: { id_producto_base, id_empresa } });
    if (product) {InventarioDB.update({ id_producto_base, id_empresa, precio, cantidad, ultima_actualizacion, id_reponedor })
    throw new Error(errorMessages.productoYaExiste);  
    }

    await Inventario.create({
      id_inventario: id,
      id_producto_base,
      id_empresa,
      precio,
      cantidad,
      ultima_actualizacion,
      id_reponedor
    });

    return id;
  }	
  static async update({ id_producto_base, id_empresa, precio, cantidad, ultima_actualizacion, id_reponedor }) {
    const product = await Inventario.findOne({ where: { id_producto_base, id_empresa } });
    if (!product) { throw new Error(errorMessages.productoNoExiste); }

    await Inventario.update({
      id_empresa,
      precio,
      cantidad,
      ultima_actualizacion,
      id_reponedor
    }, { where: { id_producto_base } });

    return product.ID_INVENTARIO;
  }
  static async get({ id_empresa }) {
    const product = await Inventario.findAll({ where: { id_empresa } });
    if (!product) { throw new Error(errorMessages.productoNoExiste); }

    return product;
  }
}

