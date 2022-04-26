const dbValidators = require('./db-validator');
const generarJTW   = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

// Los tres puntos hace que exporte todo lo que esta en cada archivo, funciones, constanstes etc
module.exports = {
    ...dbValidators,
    ...generarJTW,
    ...googleVerify,
    ...subirArchivo
}