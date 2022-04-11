const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payLoad = {uid};

        jwt.sign(payLoad, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el Token');
            }
            else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    generarJWT
}