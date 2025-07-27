import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@yopmail.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create a regular user for testing
  const regularUserPassword = await bcrypt.hash('user123', 10);
  await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'user@yopmail.com',
      password: regularUserPassword,
      role: 'USER',
    },
  });

  await prisma.event.create({
    data: {
      title: 'Launch Party',
      description: 'Celebrate our launch',
      date: new Date(),
      location: 'Online',
      organizerId: 1, // assumes this ID exists 
    },
  });
}

main()
  .then(() => {
    console.log('✅ Seeded successfully');
  })
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
