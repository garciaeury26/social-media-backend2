const { Router } = require("express");
const { check } = require("express-validator");
const { login, crearusuario, revalidarToken } = require("../controllers/auth");
const { existeEmail, existName } = require("../helpers/db-validators");
const { validarJWTK } = require("../helpers/validarJWTK");
const validarCampos = require("../middlewares/validarCampos");
const router = new Router();

router.post('/',
    [
        check('correo').isEmail(),
        check('correo', 'El correo es obligatorio').not().isEmpty(),
        check('password', 'La contraseña tiene que tener un minomo de 6').isLength(6),
        validarCampos
    ],
    login
);

router.post('/new',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        existName,
        check('correo', 'El correo es obigatorio').not().isEmpty(),
        check('correo', 'Correo no valido').isEmail(),
        existeEmail,
        check('password', 'La contraseña tiene que tener un minomo de 6').isLength(6),
        validarCampos

    ], crearusuario
)

router.get('/renew', validarJWTK, revalidarToken);

module.exports = router;

