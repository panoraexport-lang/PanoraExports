import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { VerificationModule } from './verification/verification.module';
import { ContactModule } from './contact/contact.module';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';

@Module({
    imports: [
        // Configuration
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Rate Limiting
        ThrottlerModule.forRoot([{
            ttl: 60, // 60 seconds
            limit: 10,
        }]),

        PrismaModule,
        SupabaseModule,

        // Feature Modules
        VerificationModule,
        ContactModule,
        ProductsModule,
        AdminModule,
    ],
})
export class AppModule { }
