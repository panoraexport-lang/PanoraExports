const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const adminAndUsers = await prisma.user.findMany({
    where: { role: 'ADMIN' },
    select: { email: true, name: true, role: true }
  });
  console.log('Admin Users in DB:', adminAndUsers);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
