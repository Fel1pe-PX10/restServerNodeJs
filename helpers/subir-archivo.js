const path = require('path');
const {v4: uuidv4} = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise( (resolve, reject) => {
        
        const {archivo} = files;

        // Extrayendo la extensión del archivo
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1].toLowerCase();
    
        // Validar la extensión
        // console.log(extensionesValidas);
        if(!extensionesValidas.includes(extension))
            return reject(`Extensión invalida: ${extension}, extensiones válidas: ${extensionesValidas}`);
    
        // Renombar la imagen
        const nombreTemp = uuidv4() + '.' + extension;
    
        // Subir archivo
        const uploadPath = path.join(__dirname, '../uploads/',carpeta,  nombreTemp);
    
        archivo.mv(uploadPath, function(err) {
            if (err) {
                return reject(err);
            }
    
            resolve(nombreTemp);
        });
    })
}

module.exports = {
    subirArchivo
}