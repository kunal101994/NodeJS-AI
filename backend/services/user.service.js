import { User } from "../models/user.model.js";


export const createUser = async({ email, password}) =>{
     if(!email || !password){
      throw new Error("Email and password are required");
     }
     
     const hashedPassword = await User.hashPassword(password);

     const user = await User.create({ email: email, password: hashedPassword});
     return user;

}