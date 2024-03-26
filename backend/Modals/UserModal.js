const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const { Schema, Types } = mongoose; 
const crypto= require('crypto')
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    },
    cart:{
        type:Array,
        default:[]
    },
    // address:[{type: Types.ObjectId, ref: "Address"}],
    address:{
        type:String
    },
    wishlist:[{type: Types.ObjectId, ref: "Product"}],
    passwordChangeAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
},{
    timestamps:true,
});

userSchema.pre('save',async function(next){
    if(!this.isModified("password"))
        next();

    this.password =await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.IspasswordMatch = async function(enterePswd,password){
    return await bcrypt.compare(enterePswd,password)
}

userSchema.methods.createPasswordResetToken = async function(next){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now() + 10 *60*1000
    return resetToken
}
//Export the model
module.exports = mongoose.model('User', userSchema);