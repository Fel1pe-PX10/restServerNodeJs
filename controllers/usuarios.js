const bcryptjs = require('bcryptjs');
const { response, request } = require('express');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const { q = 'Sin query', nombre = 'Sin Nombre', apikey, page = 1, limit } = req.query;


    res.json({
        msg: 'get  - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = async(req, res = response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json(errors);

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail)
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        });

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post  - Controlador',
        usuario
    })
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put  - Controlador',
        id
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch  - Controlador'
    })
}

const usuariosDelete = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'delete  - Controlador',
        id
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}