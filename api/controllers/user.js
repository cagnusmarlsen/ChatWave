import User from "../models/User.js"

export const getUser = async(req,res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId ? await User.findById(userId) : await User.findOne({username: username});
        const {password,email, ...other} = user._doc;
        res.status(200).json(other);    
    } catch (error) {
        res.status(500).json(error)
    }
}