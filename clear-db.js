import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing database...');
    const products = await prisma.product.deleteMany({});
    const categories = await prisma.productCategory.deleteMany({});
    console.log(`Deleted ${products.count} products.`);
    console.log(`Deleted ${categories.count} categories.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
