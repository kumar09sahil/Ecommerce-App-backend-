//* not found

const notFound = (req,res,next) =>{
    const error = new Error(`Not found : ${req.originalUrl}`)
    next(error)
}

const errorHandler = (err,req,res,next) =>{
    const statuscode = res.statusCode === 200 ? 500 : res.statuscode;
    // res.status(statuscode);
    res.status(statuscode).json({
        status:"fail",
        message:err?.message,  //* err?.message : here ? is optional chaining i.e if err is null then its message will not be checked hence preventing potetial runtime error
        stack:err?.stack
    })
}

module.exports = {errorHandler,notFound}