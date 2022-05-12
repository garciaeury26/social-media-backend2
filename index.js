
require('dotenv').config()
const Config = require('./models/Config');


const server = new Config();

server.listen();

