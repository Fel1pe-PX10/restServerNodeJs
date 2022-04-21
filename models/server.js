const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        // Rutas de categorias
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar/',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            categorias: '/api/categorias',
        };

        // Coneccion base de datos
        this.conectarBD();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarBD(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Lectura y Parseo del Body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}` );
        });
    }
}

module.exports = Server;