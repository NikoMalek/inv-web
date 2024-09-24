import Inventario from '../models/Inventario.js';
import crypto from 'crypto';
import { errorMessages } from '../errorvalidation.js';

export class InventarioDB {
  static async create({ ID_PRODUCTO_BASE, ID_EMPRESA, precio, cantidad, ultima_actualizacion, ID_REPONEDOR }) {
    const id = crypto.randomUUID();


    const product = await Inventario.findOne({ where: { ID_PRODUCTO_BASE, ID_EMPRESA } });
    if (product) {throw new Error(errorMessages.productoYaExiste);}

    await Inventario.create({
      ID_INVENTARIO: id,
      ID_PRODUCTO_BASE,
      ID_EMPRESA,
      precio,
      cantidad,
      ultima_actualizacion,
      ID_REPONEDOR
    });

    return id;
  }	
  static async update({ ID_PRODUCTO_BASE, ID_EMPRESA, precio, cantidad, ultima_actualizacion, ID_REPONEDOR }) {
    const product = await Inventario.findOne({ where: { ID_PRODUCTO_BASE, ID_EMPRESA } });
    if (!product) { throw new Error(errorMessages.productoNoExiste); }

    await Inventario.update({
      ID_EMPRESA,
      precio,
      cantidad,
      ultima_actualizacion,
      ID_REPONEDOR
    }, { where: { ID_PRODUCTO_BASE } });

    return product.ID_INVENTARIO;
  }
  static async get({ ID_EMPRESA }) {
    const product = await Inventario.findAll({ where: { ID_EMPRESA } });
    if (!product) { throw new Error(errorMessages.productoNoExiste); }

    return product;
  }
}

