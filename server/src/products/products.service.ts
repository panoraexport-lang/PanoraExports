import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {
        console.log('ProductsService initialized');
    }

    async findAll() {
        return this.prisma.product.findMany({
            include: {
                category: true,
                seller: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                seller: true
            }
        });
    }

    async create(data: any) {
        const categoryName = data.category || 'Uncategorized';
        // 1. Find or create category
        let category = await this.prisma.productCategory.findFirst({
            where: { name: { equals: categoryName, mode: 'insensitive' } }
        });

        if (!category) {
            category = await this.prisma.productCategory.create({
                data: {
                    name: categoryName,
                    slug: categoryName.toLowerCase().replace(/ /g, '-'),
                }
            });
        }

        // 2. Find an admin to be the seller (fallback)
        let admin = await this.prisma.user.findFirst({
            where: { role: 'ADMIN' }
        });

        if (!admin) {
            // Create a default admin if none exists
            admin = await this.prisma.user.create({
                data: {
                    email: 'Panoraexport@admin.com',
                    password: 'RishabhPanora@2025',
                    name: 'Panora Admin',
                    role: 'ADMIN',
                    country: 'India'
                }
            });
        }

        // 3. Map frontend data to DB schema
        return this.prisma.product.create({
            data: {
                name: data.name,
                description: data.description || 'No description provided.',
                priceRange: data.price || data.priceRange || 'Contact for price',
                minOrderQuantity: data.stock !== undefined ? parseInt(data.stock) : (parseInt(data.minOrder) || 1),
                originCountry: 'India',
                images: JSON.stringify([data.image]),
                categoryId: category.id,
                sellerId: admin.id,
                isActive: data.isActive !== undefined ? data.isActive : true,
            },
            include: {
                category: true,
            }
        });
    }

    async clearAllProducts() {
        return this.prisma.product.deleteMany({});
    }

    async update(id: string, data: any) {
        // Handle category update if provided
        let categoryId = data.categoryId;
        if (data.category) {
            let category = await this.prisma.productCategory.findFirst({
                where: { name: { equals: data.category, mode: 'insensitive' } }
            });
            if (!category) {
                category = await this.prisma.productCategory.create({
                    data: {
                        name: data.category,
                        slug: data.category.toLowerCase().replace(/ /g, '-'),
                    }
                });
            }
            categoryId = category.id;
        }

        return this.prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                priceRange: data.price,
                minOrderQuantity: data.minOrder ? parseInt(data.minOrder) : undefined,
                images: data.image ? JSON.stringify([data.image]) : undefined,
                categoryId: categoryId,
                isActive: data.isActive,
            }
        });
    }

    async remove(id: string) {
        return this.prisma.product.delete({
            where: { id }
        });
    }
}
