const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { obtenerPost, crearNuevoPost, nuevoLike, getPostUser } = require("../controllers/post");
const validarCampos = require("../middlewares/validarCampos");
const { validarJWTK } = require("../helpers/validarJWTK");
// const { userLikeValid } = require("../helpers/userLikeValid");


//optener todos los post
router.get('/',
    [
        validarJWTK,
        validarCampos
    ],
    obtenerPost
);

//nuevo post
router.post('/new',
    [
        validarJWTK,
        check('usuario', 'La id del usuario es obligatoria').not().isEmpty(),
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('description', 'La descripcion es obligatoria').not().isEmpty(),
        check('url', 'La url de imagen es obligatoria').not().isEmpty(),

        validarCampos
    ],
    crearNuevoPost
);


// /nuevo like
router.put('/new',
    [
        validarJWTK,
        check('id', 'El id del posts es necesario').not().isEmpty(),
        check('uid', 'El uid del usaurio es requerido').not().isEmpty(),
        check('likeState', 'El stado del like es requerido'),
        validarCampos
    ],
    nuevoLike
)

//obtenr post de usuario espesifico
router.get('/:id',  
    [
        validarJWTK,
        check('id','El id de  usurio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    getPostUser
)

module.exports = router;

