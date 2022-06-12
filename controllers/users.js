const { response, request } = require("express");
const res = require("express/lib/response");

const User = require("../models/usuario");

const getAllusers = async (req = reques, res = response) => {

    try {
        const users = await User.find();
        return res.status(200).json({
            ok: true,
            msg: 'Users',
            users
        })
    } catch (error) {
        return res.json({ msg: error, ok: false });
    }
};


const getUserByName = async (req = reques, res = response) => {
    const { name: nombre } = req.params;
    try {
        const user = await User.findOne({ nombre })

        if (user) {
            return res.status(200).json({
                msg: 'usurio obtenido',
                ok: true,
                user
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Ha ocurrido un error',
            ok: false,
        })
    }

};

const newFollower = async (req = request, res = response) => {
    const { userLike, userToFollow } = req.body;
    try {
        const user = await User.findById(userToFollow);

        if (!user.followers.includes(userLike)) {
            console.log('follow')
            await user.updateOne({ $push: { followers: userLike } })
            res.status(200).json({
                ok: true,
                user,
                msg: 'follow'
            });
        } else {
            await user.updateOne({ $pull: { followers: userLike } })
            console.log('unfollow')
            return res.status(200).json({
                ok: true,
                msg: 'unfollow',
                user
            });
        }


    } catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: 'Ha ocurrido un error inesperado'
        });
    }
};

module.exports = {
    getAllusers,
    getUserByName,
    newFollower
}