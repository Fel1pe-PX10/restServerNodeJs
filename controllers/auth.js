const bcryptjs = require('bcryptjs');
const { response, request } = require('express');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');



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

const googleSignIn = async(req, res = response) => {
    
    const {id_token} = req.body;

    try {

        const {nombre, img, correo} = await googleVerify(id_token); 

       // Validar si correo existe
       let usuario = await Usuario.findOne({correo});

       //Si no existe se crea con la información de google
       if(!usuario){
           const data = {
               correo,
               nombre,
               google: true,
               password: ':P',
               rol: 'USER_ROLE',
               estado: true,
               img
           }
           console.log(data);
           usuario = new Usuario(data);
           await usuario.save();
       }

       // Si El usuario en BD
       if(!usuario.estado){
           return res.status(401).json({
               msg: 'Hablar con el administrador, usuario bloqueado'
           });
       }

       // Genera el JWT
       const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'El token no se puede verficar'
        });
    }

}


module.exports = {
    login,
    googleSignIn
}