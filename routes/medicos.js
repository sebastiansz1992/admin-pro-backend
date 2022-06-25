const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require( "../middlewares/validar-jwt" );
const { getMedicos, actualizarMedico, crearMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();

router.get('/', validarJWT, getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [],
    actualizarMedico
);

router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;