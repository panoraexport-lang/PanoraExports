const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:Panoraexport%402025@db.qzixmcsgqhkhvhtlbopv.supabase.co:5432/postgres"
        }
    }
});
async function test() {
    try {
        console.log('Connecting...');
        await client.$connect();
        console.log('Connected!');
        const users = await client.user.count();
        console.log('Users count:', users);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await client.$disconnect();
    }
}
test();
