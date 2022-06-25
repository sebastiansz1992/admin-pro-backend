const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

const actualizarHospital = async (req, res = response) => {
    res.json({
        ok: true,
        hospitales: 'actualizarHospitales'
    });
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body,
    });

    try {

       const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error',
            error
        });
    }

}

const borrarHospital = async (req, res = response) => {
    res.json({
        ok: true,
        hospitales: 'borrarHospitales'
    });
}

module.exports = {
    getHospitales,
    actualizarHospital,
    crearHospital,
    borrarHospital
}