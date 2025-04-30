import { User } from "../models/user.model.js";
import userService from "../services/user.service.js";
import  { validationResult } from 'express-validator';


export const createUser = async(req, res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const user = await userService.createUser(req.body);
    
    const token = await user.generateJWT();


    res.status(201).json({user, token});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}