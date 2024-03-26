const jwt = require('jsonwebtoken')

const Refreshjsonwebtoken = (id)=>{
    return jwt.sign({id},process.env.SECRET_STR,{
        expiresIn:"2 days"
    }) 
}

module.exports = {Refreshjsonwebtoken}