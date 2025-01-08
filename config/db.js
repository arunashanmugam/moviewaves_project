

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
   
    await prisma.$connect();
    console.log("MySQL connected successfully!");
  } catch (error) {
    console.error("Error connecting to MySQL: " + error.message);
    process.exit(1); 
  }
};
