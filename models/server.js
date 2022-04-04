const express = require('express');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Rutas
        this.routes();
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.send('Hello World 80')
        });
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ${this.port}` );
        });
    }
}

module.exports = Server;