import { useState } from 'react';
import { Search, Grid, List, Package } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

// Sample product data with illustrative icons
const products = [
    {
        id: 1,
        name: 'Organic Cotton Fabric',
        category: 'Textiles',
        price: '$12.50/meter',
        supplier: 'Gujarat Textiles Ltd',
        image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=400&fit=crop&q=80',
        icon: '🧵',
        verified: true,
    },
    {
        id: 2,
        name: 'Basmati Rice Premium',
        category: 'Agriculture',
        price: '$850/ton',
        supplier: 'Punjab Agro Exports',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&q=80',
        icon: '🌾',
        verified: true,
    },
    {
        id: 3,
        name: 'Brass Door Handles',
        category: 'Hardware',
        price: '$24.99/piece',
        supplier: 'Jaipur Hardware Co',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80',
        icon: '🔧',
        verified: true,
    },
    {
        id: 4,
        name: 'Hand-woven Silk Saree',
        category: 'Handicrafts',
        price: '$180/piece',
        supplier: 'Kanchipuram Weavers',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop&q=80',
        icon: '🎨',
        verified: true,
    },
    {
        id: 5,
        name: 'Organic Turmeric Powder',
        category: 'Spices',
        price: '$4.50/kg',
        supplier: 'Kerala Spice Traders',
        image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=600&h=400&fit=crop&q=80',
        icon: '🌶️',
        verified: true,
    },
    {
        id: 6,
        name: 'Marble Tiles Premium',
        category: 'Hardware',
        price: '$45/sqm',
        supplier: 'Rajasthan Marble Inc',
        image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?w=600&h=400&fit=crop&q=80',
        icon: '🏗️',
        verified: true,
    },
    {
        id: 7,
        name: 'Leather Handbags',
        category: 'Leather Goods',
        price: '$65/piece',
        supplier: 'Kolkata Leather Works',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=400&fit=crop&q=80',
        icon: '👜',
        verified: true,
    },
    {
        id: 8,
        name: 'Jasmine Essential Oil',
        category: 'Ayurveda & Wellness',
        price: '$28/100ml',
        supplier: 'Tamil Nadu Aromatics',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop&q=80',
        icon: '🌸',
        verified: true,
    },
    {
        id: 9,
        name: 'Silver Jewelry Set',
        category: 'Gems & Jewelry',
        price: '$320/set',
        supplier: 'Jaipur Jewelers',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&q=80',
        icon: '💎',
        verified: true,
    },
];

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const categories = ['All', 'Textiles', 'Agriculture', 'Hardware', 'Handicrafts', 'Spices', 'Leather Goods', 'Ayurveda & Wellness', 'Gems & Jewelry'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#FDFBD4] dark:bg-[#38240D] pt-20 font-sans">
            <Navigation />

            {/* Compact Hero Section */}
            <section className="border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-900/30">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Products
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                        Browse verified products from India's top exporters
                    </p>
                </div>
            </section>

            {/* Compact Filters */}
            <section className="border-b border-[#C05800]/20 sticky top-20 bg-[#FDFBD4]/80 dark:bg-[#38240D]/80 backdrop-blur-md z-40">
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 border border-[#C05800]/20 bg-white dark:bg-[#38240D] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#C05800] rounded-sm"
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3 py-1.5 text-xs whitespace-nowrap transition-all rounded-full ${selectedCategory === category
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-sm p-0.5">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-sm transition-colors ${viewMode === 'grid'
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                    }`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-sm transition-colors ${viewMode === 'list'
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid/List */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-8">
                <div className="mb-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {filteredProducts.length} products found
                    </p>
                </div>

                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product, index) => (
                            <motion.a
                                key={product.id}
                                href={`/products/${product.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="group block bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:shadow-lg"
                            >
                                {/* Product Image - Blur to Clear on Hover (Desktop) / Auto-reveal (Mobile) */}
                                <div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                                    <motion.img
                                        src={product.image}
                                        alt={product.name}
                                        loading="lazy"
                                        whileInView={{ filter: "blur(0px) grayscale(0%)", scale: 1.05 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{
                                            duration: 1.5,
                                            ease: "easeOut",
                                            // Only run whileInView animation on mobile
                                            delay: window.innerWidth <= 768 ? 0.2 : 0
                                        }}
                                        className="absolute inset-0 w-full h-full object-cover blur-md grayscale md:group-hover:filter-none md:group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Compact Content */}
                                <div className="p-3">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            {product.category}
                                        </span>
                                        {product.verified && (
                                            <span className="px-1.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[9px] font-medium">
                                                ✓
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2 group-hover:text-[#C05800] transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 truncate">{product.supplier}</p>
                                    <p className="text-base font-bold text-slate-900 dark:text-white">{product.price}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredProducts.map((product, index) => (
                            <motion.a
                                key={product.id}
                                href={`/products/${product.id}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="group flex gap-4 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all p-4 hover:shadow-lg"
                            >
                                {/* Image Container */}
                                <div className="relative w-24 h-24 md:w-32 md:h-24 bg-slate-100 dark:bg-slate-900 flex-shrink-0 overflow-hidden rounded-md">
                                    <motion.img
                                        src={product.image}
                                        alt={product.name}
                                        loading="lazy"
                                        whileInView={{ filter: "blur(0px) grayscale(0%)", scale: 1.05 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{
                                            duration: 1.2,
                                            ease: "easeOut",
                                            delay: window.innerWidth <= 768 ? 0.1 : 0
                                        }}
                                        className="absolute inset-0 w-full h-full object-cover blur-[1px] md:group-hover:blur-0 md:group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            {product.category}
                                        </span>
                                        {product.verified && (
                                            <span className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-medium">
                                                ✓ Verified
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-[#C05800] transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{product.supplier}</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{product.price}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )
                }
            </section >
        </div >
    );
}
