const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require( "../middlewares/validar-jwt" );
const { getHospitales, actualizarHospital, crearHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();

router.get('/', validarJWT, getHospitales);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put('/:id',
    [],
    actualizarHospital
);

router.delete('/:id', validarJWT, borrarHospital);

module.exports = router;