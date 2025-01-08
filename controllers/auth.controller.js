


import prisma from "../models/prismaClient.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
 import bcrypt from 'bcrypt';
 import jwt from 'jsonwebtoken';



export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

   
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

   
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email or Username already taken" });
    }

    
    const hashedPassword = await bcryptjs.hash(password, 10);

    
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        image, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

   const token =  generateTokenAndSetCookie(newUser.id, res);

    res.status(201).json({
      success: true,
      user: { 
        id: newUser.id,
        email: newUser.email, 
        username: newUser.username, 
        image: newUser.image 
      },
      token,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateTokenAndSetCookie(user.id, res);

    res.status(200).json({
      success: true,
      user: { 
        id: user.id, 
        email: user.email,
        username: user.username,
        image: user.image,
        },
        token,
    });
  } catch (error) {
    console.error("Error while in login controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const admin = await prisma.admin.findUnique({ where: { email } });

    
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    
    const isMatch = await bcrypt.compare(password, admin.password);

    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
      { adminId: admin.id , adminEmail : admin.email}, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } 
    );

   
    res.cookie('adminToken', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    });

   
    res.status(200).json({ success: true, message: 'Admin logged in successfully', token });
  } catch (error) {
   
    res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
  }
};


export const authCheck = async (req, res) => {
    try {
      console.log("req.user : ", req.user);
      res.status(200).json({ success: true, user: req.user });
    } catch (error) {
      console.log("Error in authCheck controller", error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
