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
        icon: Package,
        subcategories: ['Cotton Fabrics', 'Silk', 'Synthetic', 'Home Textiles'],
    },
    {
        id: 'agriculture',
        name: 'Agriculture',
        description: 'Organic produce, grains, and agricultural products',
        count: 856,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop&q=80',
        icon: Package,
        subcategories: ['Rice', 'Wheat', 'Pulses', 'Fresh Produce'],
    },
    {
        id: 'hardware',
        name: 'Hardware',
        description: 'Construction materials, tools, and metal products',
        count: 623,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=600&fit=crop&q=80',
        icon: Package,
        subcategories: ['Building Materials', 'Tools', 'Fasteners', 'Metal Products'],
    },
    {
        id: 'handicrafts',
        name: 'Handicrafts',
        description: 'Traditional Indian handicrafts and artisan products',
        count: 1534,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop&q=80',
        icon: Package,
        subcategories: ['Textiles', 'Pottery', 'Woodwork', 'Metalcraft'],
    },
    {
        id: 'spices',
        name: 'Spices',
        description: 'Authentic Indian spices and seasonings',
        count: 342,
        image: 'https://images.unsplash.com/photo-1743445705835-4e66252e4dc6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==',
        icon: Package,
        subcategories: ['Whole Spices', 'Ground Spices', 'Spice Blends', 'Organic'],
    },
    {
        id: 'leather-goods',
        name: 'Leather Goods',
        description: 'Premium leather products and accessories',
        count: 478,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=600&fit=crop&q=80',
        icon: Package,
        subcategories: ['Bags', 'Shoes', 'Accessories', 'Garments'],
    },
    {
        id: 'gems-jewelry',
        name: 'Gems & Jewelry',
        description: 'Fine jewelry and precious stones',
        count: 729,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&q=80',
        icon: Package,
        subcategories: ['Gold Jewelry', 'Silver', 'Precious Stones', 'Fashion Jewelry'],
    },
    {
        id: 'ayurveda-wellness',
        name: 'Ayurveda & Wellness',
        description: 'Natural health and wellness products',
        count: 412,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop&q=80',
        icon: Package,
        subcategories: ['Herbs', 'Oils', 'Supplements', 'Cosmetics'],
    },
];

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-background pt-20 font-sans antialiased text-primary">
            <Navigation />

            {/* Hero Section */}
            <section className="bg-background">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-20 md:py-24">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-[1.5px] w-8 bg-primary" />
                        <span className="text-primary text-[9px] font-bold tracking-[0.3em] uppercase">Industry Sectors</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 tracking-tight">
                        Business <span className="font-serif italic font-light opacity-80">Sectors.</span>
                    </h1>
                    <p className="text-lg text-primary/70 max-w-xl font-medium leading-relaxed">
                        Explore our categorized export offerings across various industries, sourced from verified Indian manufacturers.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="border-y border-border bg-secondary/30">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { value: '08+', label: 'Industry Sectors' },
                            { value: '6K+', label: 'Products' },
                            { value: '500+', label: 'Verified Suppliers' },
                            { value: '25+', label: 'Countries Served' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center md:text-left">
                                <p className="text-4xl font-bold text-primary mb-1 tracking-tight">{stat.value}</p>
                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="max-w-[1600px] mx-auto px-8 md:px-12 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.a
                            key={category.id}
                            href={`/products?category=${category.name}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group bg-background border border-border hover:border-primary/20 transition-all rounded-sm overflow-hidden"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-video bg-secondary overflow-hidden">
                                <motion.img
                                    src={category.image}
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
                                <div className="absolute top-6 left-6">
                                    <category.icon className="w-8 h-8 text-primary-foreground drop-shadow-lg" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-primary mb-3 uppercase tracking-tight">
                                            {category.name}
                                        </h2>
                                        <p className="text-[13px] text-primary/60 line-clamp-2 font-medium leading-relaxed">
                                            {category.description}
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-secondary transition-all">
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Subcategories */}
                                <div className="flex flex-wrap gap-1.5 mb-8">
                                    {category.subcategories.slice(0, 3).map((sub) => (
                                        <span
                                            key={sub}
                                            className="px-3 py-1 bg-secondary border border-border text-muted-foreground text-[8px] font-bold uppercase tracking-wider rounded-sm group-hover:border-primary/20 group-hover:text-primary transition-colors"
                                        >
                                            {sub}
                                        </span>
                                    ))}
                                </div>

                                {/* Count */}
                                <div className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 border-t border-border pt-6">
                                    <Package className="w-3.5 h-3.5 text-primary/40" strokeWidth={1.5} />
                                    <span>{category.count.toLocaleString()} Listings</span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-secondary/30 relative overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-24 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 bg-background border border-border rounded-sm mb-10"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Custom Sourcing</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-primary mb-10 tracking-tight max-w-3xl mx-auto leading-tight">
                        Can't find a specific <br />
                        <span className="font-serif italic font-light opacity-80">requirement?</span>
                    </h2>
                    <p className="text-lg text-primary/60 mb-12 max-w-xl mx-auto font-medium">
                        Request a custom quote and our trade desk will identify the right manufacturers for your needs.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center px-10 py-5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded-sm group"
                    >
                        Request Quote
                        <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </section>
        </div>
    );
}
