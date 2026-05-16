const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres.qzixmcsgqhkhvhtlbopv:Panoraexport%402025@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require"
        }
    }
});
async function test() {
    try {
        console.log('Connecting to transaction pooler (6543)...');
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
