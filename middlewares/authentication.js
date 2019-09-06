const {verifyToken} = require('../helpers/token')

function authentication(req,res,next){
    try{
        const decode = verifyToken(req.headers.token)
        req.decode = decode
        next()
    } catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = authentication;