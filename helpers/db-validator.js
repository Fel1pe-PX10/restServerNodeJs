const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol)
            throw new Error(`El rol ${rol} no existe en la base de datos`);
}

const existeEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail)
        throw new Error('Ese correo ya está registrado');
}

const existeIdUsuario = async(id = '') => {
    const existeId = await Usuario.findById(id);
    if(!existeId)
        throw new Error('El ID no existe');
}

module.exports={
    esRolValido,
    existeEmail,
    existeIdUsuario
};