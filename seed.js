

import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin@123', 10); 

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@gmail.com' }, 
    update: {}, 
    create: {
      email: 'admin@gmail.com', 
      password: hashedPassword,
    },
  });

  console.log('Admin user seeded:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
