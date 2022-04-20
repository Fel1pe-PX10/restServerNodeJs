
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRol, tieneRol } = require('../middlewares');

const { obtenerCategorias, 
        crearCategoria, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');
        
const { existeCategoriaPorid } = require('../helpers/db-validator');

const router = Router();

/* 
{{url}}/api/categorias
*/
// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por id - Publico
router.get('/:id', [
    check('id', 'No es un id valido de la base de datos').isMongoId(),
    check('id').custom(existeCategoriaPorid),
    validarCampos
],obtenerCategoria);

// Crear categoria - Privado - Culquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la catergoria es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar un registro por id - privado - Culquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido de la base de datos').isMongoId(),
    check('nombre', 'El nombre de la catergoria es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorid),
    validarCampos
],actualizarCategoria);

// Borrar una categoria - privado - solo admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido de la base de datos').isMongoId(),
    check('id').custom(existeCategoriaPorid),
    validarCampos
], borrarCategoria);

module.exports = router;