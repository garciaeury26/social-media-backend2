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
    const { id,  uid } = req.body;
    try {
        const user = await User.findById(id);
        if (!user.followers.includes(uid)) {
            console.log('follow')
            await User.updateOne({ $push: { followers: uid } })
             res.status(200).json({
                ok: true,
                user,
                msg: 'follow'
            });
        } else {
            await User.updateOne({ $pull: { followers: uid } }  )
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