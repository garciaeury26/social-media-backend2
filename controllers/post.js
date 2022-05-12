const { response, request } = require("express");
const Post = require("../models/post");

const obtenerPost = async (req = request, res = response) => {

    const posts = await Post.find();

    console.log(posts)

    try {
        return res.status(200).json({
            ok: true,
            msg: 'todos los post',
            posts
        });
    } catch (error) {
        console.log(error);
        throw new Error('Ha ocurrido un error comuniquese con el administrador')
    };
};

const crearNuevoPost = async (req = request, res = response) => {
    const body = req.body;

    try {
        const post = new Post(body);

        console.log(post)

        await post.save();

        return res.status(200).json({
            ok: true,
            msg: 'nuevo post'
        });

    } catch (error) {
        console.log(error);
        throw new Error('Ha ocurrido un error comuniquese con el administrador')
    };
};

const nuevoLike = async (req = request, res = response) => {
    //uid -> identificador de usuario que a dado like
    //liskesState -> me permitara saver si el usuario a quitado el like
    let { id, uid: userUid } = req.body;

    try {
        const post = await Post.findById(id);

        if (!post.likes.includes(userUid)) {
            await post.updateOne({ $push: { likes: userUid } }); // porque no lo tine agrego un nuevo usaurio
            res.status(200).json({ ok: true, msg: 'like' })
        } else {
            await post.updateOne({ $pull: { likes: userUid } },) // quito ese usuario  por que lo tiene
            res.status(200).json({ ok: true, msg: 'dislike' })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:error
        });
    }

};

//obtenr post de usuario
const getPostUser = async(req=request,res=response)=> {
    const {id:usuario} = req.params;
    try {
        const post = await Post.find({usuario});
        console.log(post)
        return res.status(200).json({
            ok:true,
            msg:'Post de usurio',
            post
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok:false,
            msg:'Ha ocurrido un error',

        });
    }
};

module.exports = {
    obtenerPost,
    crearNuevoPost,
    nuevoLike,
    getPostUser
};

