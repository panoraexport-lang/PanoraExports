import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }
