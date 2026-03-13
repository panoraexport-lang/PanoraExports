const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: 'Panoraexport@admin.com',
      password: 'RishabhPanora@2025',
      name: 'Panora Admin',
      role: 'ADMIN',
      country: 'India'
    }
  });
  console.log('Created Admin:', admin);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
