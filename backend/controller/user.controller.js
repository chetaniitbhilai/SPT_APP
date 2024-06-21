import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword , name , position,responsibility ,department} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Username already exists." });
        }
        //HASH the password
        const salt = await bcryptjs.genSalt(10); //higher the value higher the strength but also higher the time to decrypt it 
        const hashedPassword= await bcryptjs.hash(password, salt); // hashing the password


        const newUser = new User({
            email,
            password:hashedPassword,
            name,
            position,
            responsibility,
            department
        });
        // generate JWT tokens 

        if(newUser){

            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                name:newUser.name,
                position:newUser.position,
                responsibility:newUser.responsibility,

                department:newUser.department
            });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect=await bcryptjs.compare(password,user?.password || ""); // if user doesn't exist then use empty string to compare 
        console.log(email,password);

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid email or password"});
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            email:user.email,
            password:user.password,
        });

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async(req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0}); // cleared the cookie
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}





/*

START CODE
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { email, password, confirmPassword , name , position,responsibility } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Username already exists." });
        }
        //HASH the password
        const salt = await bcryptjs.genSalt(10); //higher the value higher the strength but also higher the time to decrypt it 
        const hashedPassword= await bcryptjs.hash(password, salt); // hashing the password


        const newUser = new User({
            email,
            password:hashedPassword,
            name,
            position,
            responsibility
        });
        // generate JWT tokens 

        if(newUser){

            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                name:newUser.name,
                position:newUser.position,
                responsibility:newUser.responsibility
            });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect=await bcryptjs.compare(password,user?.password || ""); // if user doesn't exist then use empty string to compare 
        console.log(email,password);

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid email or password"});
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            email:user.email,
            password:user.password,
        });

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async(req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0}); // cleared the cookie
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}
*/