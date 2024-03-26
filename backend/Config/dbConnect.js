const mongoose = require('mongoose')

const dbConnect = () =>{
    try {
        const conn = mongoose.connect(process.env.CONN_STR)
        console.log('database created succesfu;lly..!')
        
    } catch (error) {
        console.log('database error : ',error)
    }   
}

module.exports = dbConnect