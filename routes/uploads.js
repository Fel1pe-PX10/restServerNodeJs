const {Router} = require('express');
const { check } = require('express-validator');


const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { upload, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');



const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'El id no es un id valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

router.post('/', validarArchivoSubir, upload);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id no es un id valido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
],  actualizarImagenCloudinary)


module.exports = router;