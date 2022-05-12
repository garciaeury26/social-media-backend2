const { response, request } = require('express');

const Post = require('../models/post');


//validar si el usario ya a dado like
const userLikeValid = async (req = request, res = response, next) => {

    // id = del post uid = del usuario que a dado like
    const { id, uid, likeState } = req.body;

    try {
        const post = await Post.findById(id);

        // veficar el uid del isuario que a dado like y restar al like
        const verificAndChange = post.userNameLike.map(e => {
            console.log(e);

            if (e.userUid === uid) {
                post.likes--;
                post.userNameLike.likeState = false;

                return true;
            };
        });

        console.log(verificAndChange);

        if (verificAndChange) {
            return res.status(400).json({
                msg: 'Ya le diste like'
            });
        }

        next();

    } catch (error) {
        throw new Error(`${error} -- Comuniquese con el admin 😒`);
    }


};

module.exports = { userLikeValid };