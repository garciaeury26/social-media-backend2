const mongose = require("mongoose")


const dbConection = async () => {

    try {
        await mongose.connect(process.env.MONGODB_CNN, {
            //para poder utilizar siertaas funciones
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });

        console.log('Base de dato online');

    } catch (error) {
        console.log(error);
        throw new Error('Ha ocurrido un eror en la base de datos');
    }
};

module.exports = dbConection