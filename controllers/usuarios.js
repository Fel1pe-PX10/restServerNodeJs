const bcryptjs = require('bcryptjs');
const { response, request } = require('express');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    const query = {estado:true};
    const { limite = 5, desde = 0 } = req.query; 
    
    /* const usuarios = await Usuario.find(query)
                                    .limit(Number(limite))
                                    .skip(Number(desde));
    const total = await Usuario.countDocuments(query); */

    const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                    .limit(Number(limite))
                    .skip(Number(desde))
        ])

    res.json({ 
        total,
        usuarios
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

    res.json(usuario)
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