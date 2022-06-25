const { response } = require('express');
const Medico = require( "../models/medico" );

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const actualizarMedico = async (req, res = response) => {
    res.json({
        ok: true,
        hospitales: 'actualizarMedico'
    });
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico( {
        usuario: uid,
        ...req.body,
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error',
            error
        });
    }
}

const borrarMedico = async (req, res = response) => {
    res.json({
        ok: true,
        hospitales: 'borrarMedico'
    });
}

module.exports = {
    getMedicos,
    actualizarMedico,
    crearMedico,
    borrarMedico
}