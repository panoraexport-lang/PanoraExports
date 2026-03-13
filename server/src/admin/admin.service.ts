import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    async getStats() {
        const [
            totalProducts,
            activeProducts,
            totalUsers,
            verifiedBuyers,
        ] = await Promise.all([
            this.prisma.product.count(),
            this.prisma.product.count({ where: { isActive: true } }),
            this.prisma.user.count(),
            this.prisma.user.count({ where: { isVerified: true, role: 'BUYER' } }),
        ]);

        // Orders may not exist yet if migrations haven't been run
        let totalOrders = 0;
        let totalRevenue = 0;
        try {
            totalOrders = await this.prisma.order.count();
            const rev = await this.prisma.order.aggregate({
                _sum: { totalAmount: true }
            });
            totalRevenue = Number(rev._sum.totalAmount) || 0;
        } catch (_e) {
            // orders table may be empty or not yet migrated — safe to ignore
        }

        return {
            totalProducts,
            activeProducts,
            totalUsers,
            verifiedBuyers,
            totalOrders,
            totalRevenue,
            verifiedProducts: await this.prisma.product.count({
                where: { isActive: true }
            }),
        };
    }
}

