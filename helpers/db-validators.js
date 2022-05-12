const { response } = require('express');
const { request } = require('express'); 
const Usuario = require('../models/usuario')

const existeEmail = async (req=request,res=response,next) => {
    const {correo} = req.body;
    const user = await Usuario.findOne({correo});

    if (user) {
        res.status(401).json({
            ok: false,
            msg:'El correo ya esta en uso'
        });
    };

    next();

};

const existUserByID = async (id) => {

    const user = await Usuario.findById(id);

    if (!user) {
        throw new Error('No existe este usuario')
    };
};

const estadoDelUsuario = async (id) => {
    const user = await Usuario.findById(id);
    if (user.estado == false) {
        throw new Error('Este usuario asido elimindao')
    };
};

const existName = async (req=request,res=response,next)  => {
    const {nombre} = req.body;
    const user = await Usuario.findOne({nombre});

    if(user){
        console.log('El nombre ya esta en uso)')
        return res.status(401).json({
            ok: false,
            msg: 'Este nombre ya existe',
        });
    };

    next();
}

module.exports = {
    existeEmail,
    existUserByID,
    estadoDelUsuario,
    existName
}