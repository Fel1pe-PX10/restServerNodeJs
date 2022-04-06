const bcryptjs = require('bcryptjs');
const { response, request } = require('express');

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


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    const id = req.params.id;
    const {_id, password, google, ...resto} = req.body;
    
    if(password){
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put  - Controlador',
        usuario
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