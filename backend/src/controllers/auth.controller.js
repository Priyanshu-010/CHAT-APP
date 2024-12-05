import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  console.log("Signup route hit");
  const { email, fullName, password } = req.body;
  console.log(req.body)
  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
  
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        message: "User created successfully", 
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
       });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }

  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(400).json({ message: "User not created" });
  }
}
export const login = (req, res) => {
  res.send("login") 
}
export const logout = (req, res) => {
  res.send("logout")
}