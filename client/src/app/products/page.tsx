import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import Navigation from '@/components/Navigation';
import { Package, Filter, LayoutGrid, List, Search, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const API_BASE_URL = 'http://localhost:3001/api';

const categories = ['All', 'Agriculture', 'Textiles'];

interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    supplier: string;
    image: string;
    verified: boolean;
    rating: number;
    minOrder: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const [location, setLocation] = useLocation();

    // Fetch Products from Backend
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/products`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            // Transform data to match UI expectations
            const transformed = data.map((p: any) => {
                let imageUrl = p.image || '';
                try {
                    // Handle case where image might be a JSON string from backend
                    if (p.images) {
                        const parsed = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
                        imageUrl = Array.isArray(parsed) ? parsed[0] : parsed;
                    }
                } catch (e) {
                    imageUrl = p.images;
                }

                return {
                    id: p.id,
                    name: p.name,
                    category: p.category?.name || p.category || 'General',
                    price: p.priceRange || p.price || 'By Quote',
                    supplier: p.seller?.name || 'Verified Supplier',
                    image: imageUrl,
                    verified: p.isActive,
                    rating: 4.5 + (Math.random() * 0.5), // Simulated rating for UI
                    minOrder: p.minOrderQuantity ? `${p.minOrderQuantity} units` : 'Contact for MOQ',
                };
            });
            setProducts(transformed);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle Category from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('category');
        if (catParam) {
            if (catParam.toLowerCase() === 'agriculture') setSelectedCategory('Agriculture');
            else if (catParam.toLowerCase() === 'textiles') setSelectedCategory('Textiles');
        }
    }, [window.location.search]);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.supplier.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background pt-20 font-sans antialiased text-primary">
            <Navigation />

            {/* Header */}
            <section className="bg-background border-b border-border py-16 px-6">
                <div className="max-w-[1600px] mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter uppercase"
                    >
                        Institutional <span className="font-serif italic font-light text-secondary">Trade Repository</span>
                    </motion.h1>
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-end">
                        <p className="text-primary/60 text-lg font-medium max-w-xl">
                            Curated selection of verified Indian exports suitable for international markets.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-primary/40">
                            <Package className="w-4 h-4" />
                            {filteredProducts.length} Items Available
                        </div>
                    </div>
                </div>
            </section>

            {/* Controls */}
            <section className="sticky top-[72px] z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
                <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col md:flex-row gap-4 justify-between items-center">

                    {/* Search & Filter */}
                    <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto scrollbar-hide">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-secondary/10 border border-transparent focus:border-primary/20 rounded-full text-sm font-medium w-64 outline-none transition-all placeholder:text-primary/30 text-primary"
                            />
                        </div>
                        <div className="h-8 w-[1px] bg-border mx-2" />
                        <div className="flex items-center gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all border border-transparent whitespace-nowrap",
                                        selectedCategory === cat
                                            ? "bg-secondary text-primary"
                                            : "bg-primary/5 text-primary/70 hover:text-primary hover:border-secondary/20"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2 p-1 bg-primary/5 rounded-sm border border-secondary/20">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "p-2 rounded-sm transition-all",
                                viewMode === 'grid' ? "bg-secondary text-primary" : "text-primary/40 hover:text-primary"
                            )}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "p-2 rounded-sm transition-all",
                                viewMode === 'list' ? "bg-secondary text-primary" : "text-primary/40 hover:text-primary"
                            )}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Product Grid/List */}
            <section className="max-w-[1600px] mx-auto px-6 py-12">
                <div className={cn(
                    "grid gap-8",
                    viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
                )}>
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            layout
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => setLocation(`/products/${product.id}`)}
                            className={cn(
                                "group bg-background border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all rounded-xl overflow-hidden flex cursor-pointer",
                                viewMode === 'list' ? "flex-row h-48" : "flex-col"
                            )}
                        >
                            {/* Image */}
                            <div className={cn(
                                "relative overflow-hidden bg-secondary",
                                viewMode === 'list' ? "w-64 shrink-0" : "aspect-[4/5] w-full"
                            )}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {product.verified && (
                                    <div className="absolute top-3 left-3 bg-secondary text-primary px-2 py-1 text-[8px] font-bold uppercase tracking-widest border border-secondary/20">
                                        Verified Directive
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-[9px] font-bold text-primary/60 uppercase tracking-widest bg-secondary px-2 py-1 rounded-sm">
                                        {product.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-primary">
                                        <Star className="w-3 h-3 fill-primary" />
                                        <span className="text-[10px] font-bold">{product.rating}</span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-1 uppercase tracking-tight group-hover:text-primary/80 transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="text-[11px] text-muted-foreground font-bold tracking-wider mb-4">
                                    {product.supplier}
                                </p>

                                <div className={cn("mt-auto flex items-end justify-between", viewMode === 'list' && "pb-2")}>
                                    <div>
                                        <p className="text-[9px] text-secondary font-bold uppercase tracking-widest mb-0.5">Unit Price</p>
                                        <p className="text-xl font-bold text-primary">{product.price}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-[hsl(var(--success))] text-white flex items-center justify-center rounded-sm hover:brightness-110 transition-all shadow-md">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                                {viewMode === 'list' && (
                                    <div className="mt-4 pt-4 border-t border-border flex gap-6 text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                                        <span>MOQ: {product.minOrder}</span>
                                        <span>Direct Export</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-32 border border-dashed border-border rounded-sm bg-secondary/20">
                        <Package className="w-12 h-12 text-primary/20 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-primary uppercase tracking-widest mb-2">No Products Found</h3>
                        <p className="text-primary/50">Try adjusting your filters or search terms.</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-6 text-[10px] font-bold text-primary border-b border-primary hover:opacity-70 transition-opacity uppercase tracking-widest"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
