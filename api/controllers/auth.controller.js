import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signUp = async (req,res,next) => {
    const { username , email , password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
       next(errorHandler(400 , 'All Fields Are Required'));
    }

    const hashedPassword = bcryptjs.hashSync(password , 10)

    const newUser = new User({
        username,
        email,
        password:hashedPassword,
    })

    

    try {
        await newUser.save();
        res.json('Sign Up Successful')
    } catch (error) {
        next(error)
    }

   
}