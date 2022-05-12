var jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;



const crearJWTK = (uid, nombre) => {


    return new Promise((resolve, reject) => {

        const payload = { uid, nombre }

        jwt.sign(payload, privateKey, { expiresIn: '2h' },
            (err, token) => {

                if (err) {
                    console.log(err);
                    reject('Ha ocurrido un error al crear el token');
                }

                resolve(token);
            });
    })
};


module.exports = {
    crearJWTK
}