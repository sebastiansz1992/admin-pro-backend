const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const paylopad = {
            uid
        }

        jwt.sign( paylopad, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            if ( err ) {
                console.log(err);
                reject('Error al generar el token');
            } else {
                resolve(token);
            }
        });

    });

}

module.exports = {
    generarJWT
}