const { response } = require('express');

const usuariosGet = (req, res = response) => {

    res.json({
        msg: 'get  - Controlador'
    })
}

const usuariosPost = (req, res) => {
    res.json({
        msg: 'post  - Controlador'
    })
}

const usuariosPut = (req, res) => {
    res.json({
        msg: 'put  - Controlador'
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch  - Controlador'
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete  - Controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}