const cors = require('cors');
const express = require('express');
const dbConection = require('../databases/config');

class Config {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users: '/tucorito/users',
            post: '/tucorito/posts',
            auth: '/tucorito/auth'
        };

        this.runServer();

        this.midlewers();

        this.routes();
    };

    //midlewers => son sinples funciones
    midlewers() {
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());

        //usar el directorio public
        this.app.use(express.static('public'))
    };

    routes() {
        this.app.use(this.paths.auth, require('../routers/auth'));
        this.app.use(this.paths.post, require('../routers/post'));
        this.app.use(this.paths.users, require('../routers/users'));

    };

    async runServer() {
        await dbConection();
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`corriendo en el servidor ${this.port}`)
        });
    }
}

module.exports = Config;