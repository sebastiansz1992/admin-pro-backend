const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: { $regex: busqueda, $options: 'i' } }),
        Medico.find({ nombre: { $regex: busqueda, $options: 'i' } }),
        Hospital.find({ nombre: { $regex: busqueda, $options: 'i' } })
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentosColeccion = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: { $regex: busqueda, $options: 'i' } })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: { $regex: busqueda, $options: 'i' } })
                .populate('usuario', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: { $regex: busqueda, $options: 'i' } });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla no existe'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}