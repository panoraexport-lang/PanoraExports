'use client';

import { ArrowRight, Package } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 'textiles',
        name: 'Textiles',
        description: 'Premium fabrics, garments, and textile products',
        count: 1247,
        image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=600&fit=crop&q=80',
        icon: '🧵',
        subcategories: ['Cotton Fabrics', 'Silk', 'Synthetic', 'Home Textiles'],
    },
    {
        id: 'agriculture',
        name: 'Agriculture',
        description: 'Organic produce, grains, and agricultural products',
        count: 856,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop&q=80',
        icon: '🌾',
        subcategories: ['Rice', 'Wheat', 'Pulses', 'Fresh Produce'],
    },
    {
        id: 'hardware',
        name: 'Hardware',
        description: 'Construction materials, tools, and metal products',
        count: 623,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop&q=80',
        icon: '🔧',
        subcategories: ['Building Materials', 'Tools', 'Fasteners', 'Metal Products'],
    },
    {
        id: 'handicrafts',
        name: 'Handicrafts',
        description: 'Traditional Indian handicrafts and artisan products',
        count: 1534,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop&q=80',
        icon: '🎨',
        subcategories: ['Textiles', 'Pottery', 'Woodwork', 'Metalcraft'],
    },
    {
        id: 'spices',
        name: 'Spices',
        description: 'Authentic Indian spices and seasonings',
        count: 342,
        image: 'https://images.unsplash.com/photo-1596040033229-a0b6df7b0fff?w=800&h=600&fit=crop&q=80',
        icon: '🌶️',
        subcategories: ['Whole Spices', 'Ground Spices', 'Spice Blends', 'Organic'],
    },
    {
        id: 'leather-goods',
        name: 'Leather Goods',
        description: 'Premium leather products and accessories',
        count: 478,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=600&fit=crop&q=80',
        icon: '👜',
        subcategories: ['Bags', 'Shoes', 'Accessories', 'Garments'],
    },
    {
        id: 'gems-jewelry',
        name: 'Gems & Jewelry',
        description: 'Fine jewelry and precious stones',
        count: 729,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&q=80',
        icon: '💎',
        subcategories: ['Gold Jewelry', 'Silver', 'Precious Stones', 'Fashion Jewelry'],
    },
    {
        id: 'ayurveda-wellness',
        name: 'Ayurveda & Wellness',
        description: 'Natural health and wellness products',
        count: 412,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop&q=80',
        icon: '🌸',
        subcategories: ['Herbs', 'Oils', 'Supplements', 'Cosmetics'],
    },
];

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-[#fdfbf7] dark:bg-slate-950 pt-20">
            <Navigation />

            {/* Compact Hero Section */}
            <section className="border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-900/30">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Categories
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                        Explore our diverse range of export categories
                    </p>
                </div>
            </section>

            {/* Compact Stats Bar */}
            <section className="border-b border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/20">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Main Categories</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">6,221</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Total Products</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">500+</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Verified Sellers</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">50+</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Countries</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compact Categories Grid */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                        <motion.a
                            key={category.id}
                            href={`/products?category=${category.name}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:shadow-lg overflow-hidden"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 blur-md grayscale group-hover:filter-none group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Compact Content */}
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#d4af37] transition-colors">
                                            {category.name}
                                        </h2>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                                            {category.description}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2 mt-1" />
                                </div>

                                {/* Subcategories */}
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {category.subcategories.slice(0, 3).map((sub) => (
                                        <span
                                            key={sub}
                                            className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] rounded-full"
                                        >
                                            {sub}
                                        </span>
                                    ))}
                                    {category.subcategories.length > 3 && (
                                        <span className="px-2 py-0.5 text-slate-400 text-[10px]">
                                            +{category.subcategories.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Count */}
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500">
                                    <Package className="w-3.5 h-3.5" />
                                    <span>{category.count.toLocaleString()} products</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* Compact CTA Section */}
            <section className="border-t border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/30">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Can't find what you're looking for?
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
                        Submit an RFQ and get quotes from verified suppliers
                    </p>
                    <a
                        href="/rfq"
                        className="inline-block px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium hover:opacity-90 transition-opacity uppercase tracking-wider"
                    >
                        Submit RFQ
                    </a>
                </div>
            </section>
        </div>
    );
}
