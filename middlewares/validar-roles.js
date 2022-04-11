const { response } = require("express");

const esAdminRol = (req, res = response, next) => {

    //console.log(req.usuarioEjecuta);
    if(!req.usuarioEjecuta){
        return res.status(500).json({
            msg: 'Se quiere verfiricar el rol sin validar el token primero'
        });
    
    }

    const { rol, nombre } = req.usuarioEjecuta;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
                    msg: `${nombre} no es administrador`
                });
    }

    next();
}

const tieneRol = (...roles) => {
    // Recibe los argumentos en roles y la siguiente función se encarga de retornar si es valido o no
    return (req, res = response, next) => {
        if(!req.usuarioEjecuta){
            return res.status(500).json({
                msg: 'Se quiere verfiricar el rol sin validar el token primero'
            });
        
        }

        if(!roles.includes(req.usuarioEjecuta.rol))
            return res.status(401).json({
                msg: `${req.usuarioEjecuta.nombre} NO tiene un rol autorizado`
            });

        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}