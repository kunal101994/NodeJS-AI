import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [8],
    maxLength: [50]
  },
  password: {
    type: String,
    select: false
  }
}, {timestamps: true})

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

// password compare
userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function() {
  return jwt.sign({ email: this.email}, process.env.JWT_SECRET);
}

export const User = mongoose.model('User', userSchema);