const { response } = require("express");
const { Producto, Categoria } = require('../models');


const obtenerProdcutos = async(req, res=response) => {
    
    const query = {estado:true};
    const { limite = 5, desde = 0 } = req.query;
    
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
                    .populate('usuario', 'nombre')
                    .populate('categoria', 'nombre')
                    .limit(Number(limite))
                    .skip(Number(desde))
    ]);
    
    res.json({
        total,
        productos
    });
}

const obtenerProducto = async(req, res=response) => {

    const {id} = req.params;

    const productoBD = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');
    if(!productoBD)
        return res.status(400).json({
            msg: `El producto no existe en el sistema`
        });
    
    res.status(200).json({
        productoBD
    });

}

const crearProducto = async(req, res=response) => {

    // Se extrae el nombre
    const nombre = req.body.nombre.toUpperCase();
    const { precio, descripcion } = req.body;

    // Se valida que no exista en la BD
    const productoBD = await Producto.findOne({nombre});
    if(productoBD){
        return res.status(400).json({
            msg: `El producto ${productoBD.nombre} ya existe en el sistema`
        });
    }

    // Valida categoria enviada
    const categoria = req.body.categoria.toUpperCase();
    const existeCategoria = await Categoria.findOne({nombre:categoria});
    if(!existeCategoria){
        return res.status(400).json({
            msg: `El categoria ${categoria} no es valida en el sistema`
        });
    }


    // Se crea la data a guardar
    data = {
        nombre,
        usuario: req.usuarioEjecuta._id,
        precio,
        categoria: existeCategoria._id, 
        descripcion
    }

    const producto = new Producto(data);
    producto.save();

    res.status(200).json({
        producto
    });


}

const actualizarProducto = async(req, res=response) => {

    const id = req.params.id;
    const {_id, estado, usuario, categoria, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuarioEjecuta._id;

    // Valida que no exista el nombre del producto en la base
    const productoDB = await Producto.findOne({nombre:data.nombre});
    if(productoDB){
        return res.status(200).json({
                    msg: `Error: El prodcuto ${productoDB.nombre} ya existe en la Base de Datos` 
                });
    }

    // Valida categoria enviada
    const categoriaNombre = req.body.categoria.toUpperCase();
    const existeCategoria = await Categoria.findOne({nombre:categoriaNombre});
    if(!existeCategoria){
        return res.status(400).json({
            msg: `La categoria ${categoriaNombre} no es valida en el sistema`
        });
    }

    data.categoria = existeCategoria._id;

    const producto = await Producto.findByIdAndUpdate(id, data);
    
    res.json({
        producto
    });

}

const borrarProducto = async(req, res=response) => {

    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado: false});

    res.json(producto)
}

module.exports = {
    crearProducto,
    borrarProducto,   
    obtenerProducto,
    obtenerProdcutos,
    actualizarProducto,
}