import Empresa from '../models/Empresa.js';
import crypto from 'crypto';
import { empresaSchema } from '../errorvalidation.js';


export class EmpresaDB {
  static async create({ nombre_empresa, direccion }) {
    try {
      empresaSchema.parse({ nombre_empresa, direccion });
    } catch (error) {
      throw new Error(error.errors[0].message);
    }

    const id_empresa = crypto.randomUUID();

    await Empresa.create({
      id_empresa,
      nombre_empresa,
      direccion,
    });

    return id_empresa;
  }
}