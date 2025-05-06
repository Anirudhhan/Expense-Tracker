import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    let { email, fullName, password, profilePic } = req.body;
    try {
        if (!fullName || !email || !password) return res.status(400).json({message: "All fields are required"});
        if (password.length < 6) return res.status(400).json({message: "Password should contain at least 6 character"});

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User with this email already exists"});

        if(profilePic) {
            const uploadResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadResponse.secure_url;
        }

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

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid Credentials"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials"});

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
        
    } catch (error) {
        res.status(500).json({message: "Something went wrong while logging in"});        
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });   
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error.stack);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullName, profilePic} = req.body;
        const userId = req.user._id;

        if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profilePic: uploadResponse.secure_url,
            ...(fullName && { fullName }) 
           },
          { new: true }
        );

        res.status(200).json({updatedUser});
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });        
    }    
};

export const checkAuth = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        res.status(200).json({
            _id: req.user._id,
            fullName: req.user.fullName,
            email: req.user.email,
            profilePic: req.user.profilePic,
            createdAt: req.user.createdAt,
        });
    } catch (error) {
        console.log("Error in checkAuth Controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });        
    }
};
