const { Router } = require("express");
const { check } = require("express-validator");
const { getAllusers, getUserByName, newFollower } = require("../controllers/users");
const validarCampos = require("../middlewares/validarCampos");
const router = Router();

router.get('/', getAllusers);

router.get('/:name',getUserByName);

//follow and unfollow
router.post('/',
    [
        check('id','tu id de usuario es obligatorio').not().isEmpty(),
        check('uid','El identificador del usuario a seguir es obligatorio').not().isEmpty()
    ],
    validarCampos
,
newFollower
);

module.exports = router;