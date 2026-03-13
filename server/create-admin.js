/**
 * SCRIPT: create-admin.js
 * 
 * PURPOSE: Creates an Admin user in Supabase Auth and Public Database.
 * 
 * USAGE: 
 *   node create-admin.js
 * 
 * PREREQUISITES:
 *   1. Update .env with correct DATABASE_URL
 *   2. Ensure network connectivity to Supabase (check DNS/IPv6/IPv4 support)
 * 
 * TROUBLESHOOTING:
 *   - "ClientInitializationError": Check DATABASE_URL credentials.
 *   - "getaddrinfo ENOTFOUND": Check DNS or internet connection.
 *   - "Invalid prisma.user.findUnique()": Connection failed (Auth or Network).
 *   - Use Supabase Connection Pooler (port 6543) if direct connection (5432) fails on IPv4 networks.
 */

const path = require('path');
let PrismaClient;
try {
    // Try loading from local node_modules (server)
    const localClient = require('@prisma/client');
    // Check if it's the stub
    new localClient.PrismaClient();
    PrismaClient = localClient.PrismaClient;
} catch (e) {
    if (e.message.includes('did not initialize yet')) {
        console.log('Local Prisma Client uninitialized. Trying root node_modules...');
        try {
            const rootClientPath = path.resolve(__dirname, '../node_modules/@prisma/client');
            const rootClient = require(rootClientPath);
            PrismaClient = rootClient.PrismaClient;
        } catch (e2) {
            console.error('Failed to load PrismaClient from root:', e2);
            process.exit(1);
        }
    } else {
        PrismaClient = require('@prisma/client').PrismaClient;
    }
}
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const fs = require('fs');
// path already required above

// Manual .env loading for Prisma
const envPath = path.resolve(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log(`Loading .env from ${envPath}`);
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join('=').trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            process.env[key] = value;
        }
    });
} else {
    console.warn('.env file not found, hoping environment variables are already set.');
}

if (process.env.DATABASE_URL) {
    const masked = process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@');
    console.log(`Using DATABASE_URL: ${masked}`);
} else {
    console.error('DATABASE_URL is not set!');
    process.exit(1);
}

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    },
    log: ['query', 'info', 'warn', 'error'],
});

async function main() {
    const email = 'panoraexports@admin.com';
    const password = 'RishabhPanora@2025';
    // Hash password for Supabase Auth (bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    console.log(`Checking if user ${email} exists in public.users...`);
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        console.log('User exists in public.users. Updating role...');
        await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' }
        });
        console.log('Updated public user role.');
        return; // Assuming auth user exists if public user exists
    }

    console.log('Creating new admin user...');

    let finalUserId = userId;

    try {
        await prisma.$executeRawUnsafe(`
            INSERT INTO auth.users (
                instance_id,
                id,
                aud,
                role,
                email,
                encrypted_password,
                email_confirmed_at,
                raw_app_meta_data,
                raw_user_meta_data,
                created_at,
                updated_at,
                confirmation_token,
                email_change,
                email_change_token_new,
                recovery_token
            ) VALUES (
                '00000000-0000-0000-0000-000000000000',
                '${userId}',
                'authenticated',
                'authenticated',
                '${email}',
                '${hashedPassword}',
                NOW(),
                '{"provider":"email","providers":["email"]}',
                '{"name":"Admin User", "role":"ADMIN"}',
                NOW(),
                NOW(),
                '',
                '',
                '',
                ''
            )
        `);
        console.log('Created user in auth.users');
    } catch (e) {
        if (e.message.includes('unique constraint') || e.message.includes('duplicate key') || e.code === 'P2010') {
            console.log('User seems to already exist in auth.users. Fetching ID...');
            const users = await prisma.$queryRawUnsafe(`SELECT id FROM auth.users WHERE email = '${email}'`);
            if (users.length > 0) {
                finalUserId = users[0].id;
                console.log(`Found existing Auth ID: ${finalUserId}`);

                console.log('Updating password for existing auth user...');
                await prisma.$executeRawUnsafe(`
                    UPDATE auth.users 
                    SET encrypted_password = '${hashedPassword}' 
                    WHERE id = '${finalUserId}'
                 `);
            } else {
                console.error('Error: constraint violation but count is 0?');
                throw e;
            }
        } else {
            console.error('Error inserting into auth.users:', JSON.stringify(e, null, 2));
            throw e;
        }
    }

    await createPublicUser(finalUserId, email, prisma);
}

async function createPublicUser(id, email, prisma) {
    try {
        await prisma.user.create({
            data: {
                id: id,
                email: email,
                password: 'MANAGED_BY_SUPABASE_AUTH',
                role: 'ADMIN',
                name: 'Admin User',
                country: 'India',
                isVerified: true,
                isActive: true
            }
        });
        console.log('Created user in public.users');
    } catch (e) {
        if (e.code === 'P2002') {
            console.log('User already in public.users. Updating role...');
            await prisma.user.update({
                where: { email },
                data: { role: 'ADMIN' }
            });
            console.log('Updated role.');
        } else {
            console.error('Error creating public user:', e);
            throw e;
        }
    }
}

main()
    .catch(e => {
        console.error('Error in main:');
        console.error(e.message);
        console.error(e.stack);
        console.error(JSON.stringify(e, null, 2));
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
