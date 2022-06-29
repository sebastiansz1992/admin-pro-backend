const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const fs = require( "fs" );

const borrarImagen = async ( path ) => {

    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }

}


const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

    let pathViejo = '';

    switch (tipo) {
        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No existe hospital');
                return false;
            }

            pathViejo = `./uploads/medicos/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case 'medicos':

            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No existe medico');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No existe usuario');
                return false;
            }

            pathViejo = `./uploads/medicos/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}