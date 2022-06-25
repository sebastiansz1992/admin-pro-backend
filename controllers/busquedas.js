const { response } = require('express');

const getTodo = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'busqueda'
    });
}

module.exports = {
    getTodo
}