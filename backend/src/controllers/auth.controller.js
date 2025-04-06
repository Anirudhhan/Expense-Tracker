import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";

export const signup = async(req, res) => {
    const { email, fullName, password, profilePic } = req.body;
    try {
        if (!fullName || !email || !password) return res.status(400).json({message: "All feilds are required"});
        if (password.length < 6) return res.status(400).json({message: "Password should contain atleast 6 character"});

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User with this email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({fullName, email, password: hashedPassword, profilePic});
        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }        
    } catch (error) {
        res.status(400).json({message: "Invalid user data"});        
    }
};