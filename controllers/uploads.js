
const fs = require('fs');
const path = require('path');
const { response } = require("express");

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models');
const res = require('express/lib/response');



const upload = async(req, res=response) => {

    try {
        // Extensiones por defecto y carpeta vacia, las mantengo para conserver estructura, (no es necesario)
        const nombre = await subirArchivo(req.files, ['png', 'jpg', 'jpeg', 'gif'], 'imgs');

        res.json({nombre});
    } catch (msg) {
        res.status(400).json({msg});
    }
    
}

const actualizarImagen = async(req, res=response) => {

    const {id, coleccion} = req.params;
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            
            if(!modelo)
                return res.status(500).json({msg:`No existe un usuario con id: ${id}`});

            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if(!modelo)
                return res.status(500).json({msg:`No existe un producto con id: ${id}`});

            break;
    
        default:
            return res.status(500).json({msg:'Falta completar esta función'});
            break;
    }

    // Limpiar imagenes previas
    if(modelo.img){
        // Borrar imagen del servidor
        const pathImagen = path.join(__dirname,'../uploads/', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, ['png', 'jpg', 'jpeg', 'gif'], coleccion);
    
    modelo.img = nombre;

    await modelo.save();

    res.json({
       modelo
    });
}

const actualizarImagenCloudinary = async(req, res=response) => {

    const {id, coleccion} = req.params;
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            
            if(!modelo)
                return res.status(500).json({msg:`No existe un usuario con id: ${id}`});

            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if(!modelo)
                return res.status(500).json({msg:`No existe un producto con id: ${id}`});

            break;
    
        default:
            return res.status(500).json({msg:'Falta completar esta función'});
            break;
    }

    // Limpiar imagenes previas
    if(modelo.img){
        // Borrar imagen de cloudinary
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');

        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

   
    modelo.img = secure_url;

    await modelo.save();

    res.json({
       modelo
    });
}

const mostrarImagen = async(req, res = response) => {

    const {id, coleccion} = req.params;
    
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            
            if(!modelo)
                return res.status(500).json({msg:`No existe un usuario con id: ${id}`});

            break;
        case 'productos':
            modelo = await Producto.findById(id);

            if(!modelo)
                return res.status(500).json({msg:`No existe un producto con id: ${id}`});

            break;
    
        default:
            return res.status(500).json({msg:'Falta completar esta función'});
            break;
    }

    // Limpiar imagenes previas
    if(modelo.img){
        // Borrar imagen del servidor
        const pathImagen = path.join(__dirname,'../uploads/', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        }
    }

    const pathImagen = path.join(__dirname,'../assets/no-image.jpg');
    return res.sendFile(pathImagen);
      
}


module.exports = {
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen,
    upload,
}