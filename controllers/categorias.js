const { response, request } = require('express');


const { Categoria } = require('../models');

// obtenerCategorias - Paginado - total - populate
// obtenerCategoria - populate


const obtenerCategorias = async(req, res=response) => {
    
    const query = {estado:true};
    const { limite = 5, desde = 0 } = req.query;
    
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario', 'nombre').limit(Number(limite)).skip(Number(desde))
    ]);
    
    res.json({
        total,
        categorias
    });
}

const obtenerCategoria = async(req, res=response) => {
    
    const id = req.params.id;

    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    
    res.json({
        categoria
    });
}

const crearCategoria = async(req, res=response) => {
    
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB){
        res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    // Generar data a guardar
    const data = {
        nombre,
        usuario: req.usuarioEjecuta._id
    }
    const categoria = new Categoria(data);

    // Guardar en base de datos
    categoria.save();


    
    res.status(201).json({
        categoria
    });
}

const actualizarCategoria = async(req, res=response) => {
    
    const id = req.params.id;
    const {_id, estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuarioEjecuta._id;

    // Valida que no exista el nombre en la base
    const categoriaDB = await Categoria.findOne({nombre:data.nombre});
    if(categoriaDB){
        return res.status(200).json({
                    msg: `Error: la categoría ${categoriaDB.nombre} ya existe en la Base de Datos` 
                });
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data);
    
    res.json({
        categoria
    });
}

const borrarCategoria = async(req, res=response) => {
    const {id} = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.json(categoria)
}
module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}