import Default_Product from "../models/Products.js";
import crypto from 'crypto';


export class ProductDB {
  static async create ({ nombre , description, imagen, codigoBarras }) {

    const product = await Default_Product.findOne({ where: { BARCODE: codigoBarras } });
    if (product) {
      throw new Error('El producto ya existe')
    }

    const id = crypto.randomUUID()

    await Default_Product.create({
      ID_PRODUCT_DEFAULT: id,
      NAME_PRODUCT: nombre,
      DESCRIPTION_PRODUCT: description,
      IMAGE_PRODUCT: imagen,
      BARCODE: codigoBarras
    });
    
    return id

  }
  static async get ({ barcode }) {

    const product = await Default_Product.findOne({ where: { barcode } });
    if (!product) { throw new Error('El producto no existe') }
    
    product.dataValues = {
      id: product.ID_PRODUCT_DEFAULT,
      nombre: product.NAME_PRODUCT,
      description: product.DESCRIPTION_PRODUCT,
      imagen: product.IMAGE_PRODUCT,
      codigoBarras: product.BARCODE
    }
    return product

  }
}