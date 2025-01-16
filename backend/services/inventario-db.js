import Inventario from '../models/Inventario.js';
import crypto from 'crypto';
import { errorMessages } from '../errorvalidation.js';
import { ProductDB } from './products-db.js';
import { UserDB } from './user-db.js';

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
    }, { where: { id_producto_base, id_empresa} });

    return product.ID_INVENTARIO;
  }
  static async get({ id_empresa }) {
    const inventarios = await Inventario.findAll({ where: { id_empresa } });
    if (!inventarios) { throw new Error(errorMessages.productoNoExiste); }

    const productos = await Promise.all(inventarios.map(async (inventario) => {
      const productoBase = await ProductDB.getbyId({ id_producto_base: inventario.id_producto_base });
      console.log("PRODUCTO BASE: ", productoBase);
      const reponedor = await UserDB.getProfile({ id: inventario.id_reponedor });
      return {
        id: inventario.id_inventario,
        idProductoBase: productoBase.id,
        nombre: productoBase.nombre,
        descripcion: productoBase.description,
        imagen: productoBase.imagen,
        codigoBarras: productoBase.codigoBarras,
        precio: inventario.precio,
        cantidad: inventario.cantidad,
        ultimaActualizacion: inventario.ultima_actualizacion,
        reponedor: `${reponedor.nombre} ${reponedor.apellido}`,
        idReponedor: inventario.id_reponedor
      };
    }));
    return productos;
  }
}

