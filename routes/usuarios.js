
const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos, validarJWT, esAdminRol, tieneRol } = require('../middlewares');

const { esRolValido, existeEmail, existeIdUsuario } = require('../helpers/db-validator');

const { usuariosGet, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPut, 
        usuariosPatch } = require('../controllers/usuarios');



const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeIdUsuario),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mas de 6 letras').isLength({min:6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(existeEmail),
        //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRolValido), //(rol) => esRolValido(rol) es lo mismo
        validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id', [
        validarJWT,
        //esAdminRol,//Fuerza que debe ser administrador
        tieneRol('ADMIN_ROLE', 'USER_ROLE'),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeIdUsuario),
        validarCampos
], usuariosDelete);



module.exports = router;