
const { Router } = require('express');

const { usuariosGet, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPut, 
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/', usuariosPut);

router.post('/', usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);



module.exports = router;