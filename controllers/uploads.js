const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require( "../helpers/actualizar-imagen" );
const path = require( "path" );
const fs = require( "fs" );

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        });
    }

    // Validar archivo
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar extensiones
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension valida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extension }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover el archivo del temporal a nuestro path
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            });
        }

        // Actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });
}

const retornaImagen = (req, res = response) => {

        const tipo = req.params.tipo;
        const foto = req.params.foto;

        const pathImagen = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

        if (fs.existsSync(pathImagen)) {
            res.sendFile(pathImagen);
        } else {
            res.sendFile(path.join(__dirname, `../uploads/no-image.jpg`));
        }

}

module.exports = {
    fileUpload,
    retornaImagen
}