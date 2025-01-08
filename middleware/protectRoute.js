

import jwt from "jsonwebtoken";
import prisma from "../models/prismaClient.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-netflix"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated. Please log in.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (decoded.adminId) {
      const admin = await prisma.admin.findUnique({
        where: { id: decoded.adminId },
      });

      if (!admin) {
        return res.status(403).json({
          success: false,
          message: "Admin not found.",
        });
      }

      req.admin = admin; 
    } else {
      return res.status(403).json({
        success: false,
        message: "Only admins can perform this action.",
      });
    }

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};


