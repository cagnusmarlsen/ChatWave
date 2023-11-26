import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {createError} from "../utils/errors.js";

export const register = async (req,res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save();
        res.status(200).send("User has been created");
    } catch (error) {
        res.status(400).send("Error!");
    }
}
export const login = async (req,res,next) => {
    try {
       const user = await User.findOne({username: req.body.username});
       if(!user) {
        return next(createError(404, "User not found!"));
       }
       
       const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
       if(!isPasswordCorrect) {
        return next(createError(400, "Wrong password or username!"));
       }
       const token = jwt.sign({id:user._id, username: user.username}, process.env.JWT);

       res.cookie("jwt", token, {
        httpOnly: true,
       }).status(200).json(user);


    } catch (error) {
        next(error);
    }
}
export const verifyToken = async (req,res,next) => {

    const token = req.cookies.jwt;
    if(!token) {
        return next(createError(401, "You are not authenticated"));
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) {
            return next(createError(403, "Token is not valid"));
        }
        req.user = user;
        res.json(user);
    })
    next();
}