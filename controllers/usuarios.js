const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const { q = 'Sin query', nombre = 'Sin Nombre', apikey } = req.query;

    res.json({
        msg: 'get  - Controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post  - Controlador',
        nombre,
        edad
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