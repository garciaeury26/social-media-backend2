const { response, request } = require('express');
const Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');

const validarJWTK = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion',
        });
    }

    try {
        const { uid, nombre } = jwt.verify(token, process.env.PRIVATE_KEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'No existe un usaurio con es id',
            });
        }

        req.uid = uid;
        req.nombre = nombre;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });

    }


}

module.exports = { validarJWTK }