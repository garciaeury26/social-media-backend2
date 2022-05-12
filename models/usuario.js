const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    nombre: {
        require: [true, 'El nombre es obligatorio'],
        type: String,
        unique: true,
    },
    correo: {
        type: String,
        require: [true, 'El correo es obliatorio'],
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
        require: [false, 'la url de imagen es obligatoria'],
    },
    estado: {
        require: true,
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

    followers:{
        type:Array,
        default:[]
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, _id, ...usuario } = this.toObject();
    usuario.uid = _id;

    return usuario;
}

module.exports = model('User', UserSchema)