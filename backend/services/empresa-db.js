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
  static async getEmpresa({id_empresa}) {
    if (!id_empresa) {
      throw new Error('El id_empresa es requerido');
    }
    const empresas = await Empresa.findOne({ where: { id_empresa } });
    return empresas;
  }
}