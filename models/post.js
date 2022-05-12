const { Schema, model } = require("mongoose");

const PostSchema = Schema({
    title: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    description: {
        type: String,
        max: 500,
    },
    url: {
        type: String,
        require: [true, 'La url de imagen requerida'],
        unique: true
    },
    likes: {
        type: Array,
        default: []
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});

PostSchema.methods.toJson = function () {
    const { __v, id, ...post } = this.toObject();
    post.uid = id
    return post;
};

module.exports = model('Post', PostSchema);

