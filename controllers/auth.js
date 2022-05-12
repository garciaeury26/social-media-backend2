const { response, request } = require("express");
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');
const { crearJWTK } = require("../helpers/crearJWTK");

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: `Correo ${correo} no esta registrado`
            });
        }

        const compararContraseñas = bcrypt.compareSync(password, usuario.password);

        if (!compararContraseñas) {
            return res.status(401).json({
                ok: false,
                msg: `Contraseña incorrecta`
            });
        };

        const { id: uid, nombre } = usuario;
        const token = await crearJWTK(uid, nombre);

        return res.status(200).json({
            ok: 'true',
            msg: 'login',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        throw new Error('Ha ocurrido un error en la base de datos');
    }
};

const crearusuario = async (req = request, res = response) => {
    const body = req.body;
    try {
        const usuario = new Usuario(body);

        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(usuario.password, salt)

        await usuario.save();

        const { id: uid, nombre } = usuario;
        const token = await crearJWTK(uid, nombre);

        return res.status(200).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:error
        });
    };
};

const revalidarToken = async (req = request, res = response) => {
    const { uid, nombre } = req;

    const token = await crearJWTK(uid, nombre)

    return res.status(200).json({
        ok: true,
        token,
        uid, nombre
    });
}

module.exports = {
    login,
    crearusuario,
    revalidarToken
}