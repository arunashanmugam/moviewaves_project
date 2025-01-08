import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();



export const generateTokenAndSetCookie = (user, res) => {
 
  const tokenPayload = { 
    userId: user.id, 
    adminId: user.isAdmin ? user.id : 1 
  };

  
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "15d",  
  });

  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,  
    httpOnly: true,                    
    sameSite: true,                   
  });

  return token;  
};
