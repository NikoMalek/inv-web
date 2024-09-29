import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import RUT from 'rut-chile';
import { EmpresaDB } from './empresa-db.js';
import { userSchema, errorMessages } from '../errorvalidation.js';


// import DBLocal from 'db-local';


// const { Schema } = new DBLocal({ path: './userdb' });


// const User = Schema('User', {
//   _id: {type: String,required: true},
//   email: {type: String,required: true},
//   password: {type: String,required: true}
// })


export class UserDB {
  static async create ({ nombre, apellido, rut, telefono, nombre_empresa, direccion, email, password }) {

    // const isValid = RUT.validate(rut);
    // console.log(isValid)
    // // verificamos si el rut es valido
    // if (!isValid) {
    //   throw new Error(errorMessages.rutInvalido)
    // }



    try {
      userSchema.parse({ nombre, apellido, rut, telefono, email, password });
    } catch (error) {
      throw new Error(error.errors[0].message);
    }


    // verificar si el usuario no existe

    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new Error(errorMessages.emailRegistrado)
    }


    // crear empresa
    const id_empresa = await EmpresaDB.create({ nombre_empresa, direccion })

    // crear id
    const id = crypto.randomUUID()

    const hashedPassword = await bcrypt.hash(password, 10) // 10 es el número de veces que se va a encriptar la contraseña

    await User.create({
      id_user: id,
      nombre,
      apellido,
      rut,
      telefono,
      id_empresa,
      email, 
      password: hashedPassword
    });
    
    return id

  }
  static async login ({ email , password }) {

    try {
      userSchema.pick({ email: true, password: true }).parse({ email, password });
    } catch (error) {
      throw new Error(error.errors[0].message);
    }

    const user = await User.findOne({ where: { email } });
    console.log('user',user)
    if (!user) { throw new Error(errorMessages.emailNoExiste) }
    
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log('isValidPassword',isValidPassword)
    if (!isValidPassword) { throw new Error(errorMessages.passwordIncorrecta) }

    const { nombre_empresa } = await EmpresaDB.getEmpresa({ id_empresa: user.id_empresa })

    const { password: _, ...publicUser } = user.toJSON();

    publicUser.nombre_empresa = nombre_empresa;
    // const { _id,password: _, ...publicUser } = user
    console.log('publicUser',publicUser)
    return publicUser

  }

   // Nuevo método para obtener el perfil de usuario
   static async getProfile(userId) {
    try {
      // Paso 1: Obtener el usuario
      const user = await User.findOne({ where: { id_user: userId } });
      if (!user) {
        throw new Error(errorMessages.usuarioNoEncontrado);
      }
  
      // Paso 2: Obtener la empresa usando el id_empresa del usuario
      const empresa = await EmpresaDB.getEmpresa({ id_empresa: user.id_empresa });
      
      // Verifica si se encontró la empresa
      if (!empresa) {
        throw new Error('Empresa no encontrada');
      }
  
      // Paso 3: Combina los datos del usuario y la empresa
      const userProfile = {
        id_user: user.id_user,
        nombre: user.nombre,
        apellido: user.apellido,
        rut: user.rut,
        telefono: user.telefono,
        email: user.email,
        id_empresa: user.id_empresa,
        nombre_empresa: empresa.nombre_empresa,  
        direccion_empresa: empresa.direccion,    
      };
  
      return userProfile;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}