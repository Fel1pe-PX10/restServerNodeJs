const jwt = require('jsonwebtoken');

const { response, request } = require('express');

const Usuario = require('../models/usuario');



const validarJWT = async(req = request, res = response, next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Valida si el usuario que se encuentra en el token existe
        const usuarioValido = await Usuario.findById(uid);
        if(!usuarioValido)
            return res.status(400).json({
                msg: 'El token no es valido - usuario no existe'
            });
        
        if(!usuarioValido.estado){
            return res.status(400).json({
                msg: 'El token no es valido - usuario estado false'
            });
        }

        req.usuarioEjecuta = usuarioValido;  
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });
        
    }

}

module.exports = {
    validarJWT
}