const jwt = require('jsonwebtoken')

const jsonwebtoken = (id)=>{
    return jwt.sign({id},process.env.SECRET_STR,{
        expiresIn:"2 days"
    }) 
}

module.exports = jsonwebtoken