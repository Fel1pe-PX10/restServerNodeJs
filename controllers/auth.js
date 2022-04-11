const bcryptjs = require('bcryptjs');
const { response, request } = require('express');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');



const login = async(req = request, res = response) => {

    const {correo, password} = req.body;
    try {
        // Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'El correo / password no son correctos - correo'
            });
        }

        // Verificar si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El correo / password no son correctos - Estado: false'
            });
        }

        // Verifica la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'El correo / password no son correctos - password'
            });
        }

        // Genera el JWT
        const token = await generarJWT( usuario.id );
        

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    login
}