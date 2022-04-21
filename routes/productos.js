
const { Router } = require('express');
const { check } = require('express-validator');

const { route } = require('./auth');

const { validarCampos, validarJWT, esAdminRol, tieneRol } = require('../middlewares');

const { existeCategoriaPorNombre, existeProductoPorId } = require('../helpers/db-validator');

const { obtenerProdcutos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');


const router = Router();

// Obtener todos los productos - Publico
router.get('/', obtenerProdcutos);

// Obtener un producto único - Publico
router.get('/:id', [
    check('id', 'El id debe ser un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

// Crear Productos - privado - Token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('precio', 'El precio del producto es obligatorio y debe ser nuemerico').isNumeric().not().isEmpty(),
    check('categoria', 'La categoria del producto es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripción del producto es obligatoria').not().isEmpty(),
    //check('categoria').custom(existeCategoriaPorNombre),
    validarCampos
], crearProducto);

// Aactualizar producto - privado - Token
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('precio', 'El precio del producto es obligatorio y debe ser numérico').isNumeric().not().isEmpty(),
    check('categoria', 'La categoria del producto es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripción del producto es obligatoria').not().isEmpty(),
    check('disponible', 'La disponibilidad del producto es obligatoria y debe ser boolean').isBoolean().not().isEmpty(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

// Borrar producto - privado - Token, Admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'El id debe ser un id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports = router;