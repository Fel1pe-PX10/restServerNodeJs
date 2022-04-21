const Role = require('../models/role');
const Usuario = require('../models/usuario');
const {Categoria, Producto} = require('../models');
const req = require('express/lib/request');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol)
            throw new Error(`El rol ${rol} no existe en la base de datos`);
}

const existeEmail = async(correo = '') => {
    // Valida si el id pasado concuerda con el formato de un id de mongo (evita el error Cast to ObjectId failed for value \"12345678912345678912345\" (type string) at path \"_id\" for model \"Usuario\")
    if(!id.match(/^[0-9a-fA-F]{24}$/))
        throw new Error('El ID no existe');

    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail)
        throw new Error('Ese correo ya está registrado');
}

const existeIdUsuario = async(id = '') => {
    const existeId = await Usuario.findById(id);
    if(!existeId)
        throw new Error('El ID no existe');
}

const existeCategoriaPorid = async(id = '') => {

    // Valida si el id pasado concuerda con el formato de un id de mongo (evita el error Cast to ObjectId failed for value \"12345678912345678912345\" (type string) at path \"_id\" for model \"Usuario\")
    if(!id.match(/^[0-9a-fA-F]{24}$/))
        throw new Error('El ID no existe');

    const existeId = await Categoria.findById(id);
    if(!existeId)
        throw new Error('El ID no existe');
}

const existeCategoriaPorNombre = async(nombre = '') => {
    const existeCategoria = await Categoria.findOne({nombre});
    if(!existeCategoria)
        throw new Error('La categoria no es valida');

}

const existeProductoPorId = async(id = '') => {
    const existeCategoria = await Producto.findById(id);
    if(!existeCategoria)
        throw new Error('La producto no es valido');

}

module.exports={
    esRolValido,
    existeEmail,
    existeIdUsuario,
    existeProductoPorId,
    existeCategoriaPorid,
    existeCategoriaPorNombre,
};