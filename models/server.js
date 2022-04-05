const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

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
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}` );
        });
    }
}

module.exports = Server;