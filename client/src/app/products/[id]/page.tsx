'use client';

import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Package, Shield, Truck, Star, Share2, Globe, FileText, Mail, BookOpen, Download, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Sample product data (in real app, this would come from API)
const allProducts = [
    {
        id: '1',
        name: 'Organic Cotton Fabric',
        category: 'Textiles',
        price: '$12.50/meter',
        supplier: 'Gujarat Textiles Ltd',
        image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1200&h=800&fit=crop&q=90',
        icon: Package,
        verified: true,
        description: 'Elite-grade organic cotton fabric, GOTS certified and ethically sourced. Engineered for high-end luxury apparel and sustainable textile applications. Boasting exceptional tensile strength and superior dye absorption.',
        minOrder: '500 meters',
        leadTime: '15-20 days',
        rating: 4.8,
        reviews: 124,
        specs: [
            { label: 'Composition', value: '100% Organic Cotton' },
            { label: 'Weight', value: '180 GSM' },
            { label: 'Certification', value: 'GOTS, OEKO-TEX' },
            { label: 'Origin', value: 'Gujarat, India' }
        ]
    },
    {
        id: '2',
        name: 'Basmati Rice Premium',
        category: 'Agriculture',
        price: '$850/ton',
        supplier: 'Punjab Agro Exports',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&h=800&fit=crop&q=90',
        icon: Package,
        verified: true,
        description: 'Traditional long-grain aged Basmati rice. Sourced from the foothills of the Himalayas, this variety offers an unparalleled aroma and non-sticky texture. Aged for 24 months to ensure peak flavor profile.',
        minOrder: '10 tons',
        leadTime: '10-15 days',
        rating: 4.9,
        reviews: 89,
        specs: [
            { label: 'Grain Length', value: '8.35mm+' },
            { label: 'Aging', value: '24 Months' },
            { label: 'Broken Grain', value: '< 2%' },
            { label: 'Moisture', value: '< 12%' }
        ]
    },
    {
        id: '3',
        name: 'Brass Door Handles',
        category: 'Hardware',
        price: '$24.99/piece',
        supplier: 'Jaipur Hardware Co',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=90',
        icon: Package,
        verified: true,
        description: 'Artisanal brass hardware featuring an antique hand-applied finish. Designed for architectural significance and durability in high-traffic commercial or residential environments.',
        minOrder: '100 pieces',
        leadTime: '20-25 days',
        rating: 4.7,
        reviews: 56,
        specs: [
            { label: 'Material', value: 'High-Grade Brass' },
            { label: 'Finish', value: 'Antique Bronze' },
            { label: 'Durability', value: 'Rust Resistant' },
            { label: 'Mounting', value: 'Universal' }
        ]
    },
];

export default function ProductDetailPage() {
    const params = useParams();
    const { user } = useAuth();
    const { toast } = useToast();
    const [, setLocation] = useLocation();
    const [showActualImage, setShowActualImage] = useState(false);

    const handleSecuredAction = (type: string) => {
        if (!user || user.verification_status !== 'VERIFIED') {
            toast({
                title: "Institutional Verification Required",
                description: "This trade action is restricted to verified business entities.",
                variant: "destructive"
            });
            setLocation('/verification');
            return;
        }

        const product = allProducts.find(p => p.id === params.id);
        if (!product) return;

        if (type === 'SAMPLE') {
            setLocation(`/samples/request?product=${encodeURIComponent(product.name)}`);
        } else {
            setLocation(`/trade-inquiry?product=${encodeURIComponent(product.name)}&type=${type}`);
        }
    };

    const product = allProducts.find(p => p.id === params.id);

    if (!product) {
        return (
            <div className="min-h-screen bg-background pt-20">
                <Navigation />
                <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-32 text-center">
                    <h1 className="text-4xl font-black text-foreground mb-6 uppercase tracking-tighter">Specification Not Found</h1>
                    <button
                        onClick={() => setLocation('/products')}
                        className="text-[10px] text-primary font-black uppercase tracking-[0.3em] hover:underline"
                    >
                        ← Return to Inventory
                    </button>
                </div>
            </div>
        );
    }

    const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id);

    return (
        <div className="min-h-screen bg-background pt-20 font-sans antialiased text-primary">
            <Navigation />

            {/* Breadcrumb */}
            <section className="bg-background border-b border-border">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-5">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <a href="/products" className="hover:text-primary transition-colors">Products</a>
                        <span className="opacity-30">/</span>
                        <a href={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</a>
                        <span className="opacity-30">/</span>
                        <span className="text-primary">{product.name}</span>
                    </div>
                </div>
            </section>

            <section className="max-w-[1400px] mx-auto px-8 md:px-12 py-12">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-12 transition-all group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">
                    {/* Image */}
                    <div className="relative aspect-square bg-secondary rounded-sm overflow-hidden border border-border">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {product.verified && (
                            <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest border border-border">
                                Verified Quality
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <div className="mb-10">
                            <span className="text-primary text-[9px] font-bold uppercase tracking-widest mb-4 block px-3 py-1 bg-secondary w-fit rounded-sm">
                                {product.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-[1.1] tracking-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                                <p className="text-3xl font-bold text-primary">{product.price}</p>
                                <div className="h-6 w-[1.5px] bg-border" />
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-primary/10'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                                        Rating: {product.rating}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10 mb-12">
                            <div className="prose prose-sm font-medium text-primary/70 leading-relaxed">
                                <p className="text-lg italic font-serif opacity-80 mb-4 border-l-2 border-primary pl-6">
                                    "{product.description}"
                                </p>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-px bg-border border border-border rounded-sm overflow-hidden">
                                {product.specs?.map((spec, i) => (
                                    <div key={i} className="bg-background p-5">
                                        <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{spec.label}</p>
                                        <p className="text-[13px] font-bold text-primary uppercase">{spec.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-secondary border border-border rounded-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Package className="w-3.5 h-3.5 text-primary/60" />
                                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">MOQ</span>
                                    </div>
                                    <p className="text-lg font-bold text-primary">{product.minOrder}</p>
                                </div>
                                <div className="p-6 bg-secondary border border-border rounded-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Truck className="w-3.5 h-3.5 text-primary/60" />
                                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Lead Time</span>
                                    </div>
                                    <p className="text-lg font-bold text-primary">{product.leadTime}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 mt-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleSecuredAction('ORDER')}
                                    className="px-8 py-4 bg-[hsl(var(--success))] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all rounded-sm flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(22,101,52,0.15)] group"
                                >
                                    <Star className="w-4 h-4 fill-white" />
                                    Confirm Selection / Start Order
                                </button>
                                <button
                                    onClick={() => handleSecuredAction('QUOTE')}
                                    className="px-8 py-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary/90 transition-all rounded-sm flex items-center justify-center gap-3 shadow-lg group"
                                >
                                    <FileText className="w-4 h-4" />
                                    Institutional Quote Request
                                </button>
                            </div>

                            {/* Secondary CTAs */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleSecuredAction('SAMPLE')}
                                    className="px-4 py-3 border border-border bg-background hover:bg-secondary transition-all rounded-sm flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest text-primary"
                                >
                                    <Package className="w-3.5 h-3.5" />
                                    Ask for Samples
                                </button>
                                <button
                                    onClick={() => handleSecuredAction('CATALOGUE')}
                                    className="px-4 py-3 border border-border bg-background hover:bg-secondary transition-all rounded-sm flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest text-primary"
                                >
                                    <BookOpen className="w-3.5 h-3.5" />
                                    Request Catalogue
                                </button>
                            </div>

                            {/* Tertiary Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="px-4 py-3 border border-border bg-background hover:bg-secondary transition-all rounded-sm flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest text-primary">
                                    <Download className="w-3.5 h-3.5" />
                                    Download Specs
                                </button>
                                <button
                                    onClick={() => handleSecuredAction('WHATSAPP')}
                                    className="px-4 py-3 bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all rounded-sm flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest shadow-sm"
                                >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Verification Section */}
            <section className="bg-secondary/30 py-16 mt-16 border-y border-border">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-background rounded-sm flex items-center justify-center border border-border shrink-0">
                                <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2">Vetted Source</h4>
                                <p className="text-[12px] text-primary/60 font-medium leading-relaxed">Certified manufacturer with verified production capabilities.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-background rounded-sm flex items-center justify-center border border-border shrink-0">
                                <Globe className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2">Export Ready</h4>
                                <p className="text-[12px] text-primary/60 font-medium leading-relaxed">Packaging and documentation meet international logistics standards.</p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-12 h-12 bg-background rounded-sm flex items-center justify-center border border-border shrink-0">
                                <Share2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold text-primary uppercase tracking-widest mb-2">Full Traceability</h4>
                                <p className="text-[12px] text-primary/60 font-medium leading-relaxed">Transparent sourcing from factory to final destination.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="max-w-[1400px] mx-auto px-8 md:px-12 py-20">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">Related <span className="font-serif italic font-light opacity-80">Products</span></h2>
                        <a href="/products" className="text-[9px] font-bold uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">View All</a>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {relatedProducts.map((relatedProduct, index) => (
                            <motion.a
                                key={relatedProduct.id}
                                href={`/products/${relatedProduct.id}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group block bg-background border border-border hover:border-primary/20 transition-all rounded-sm overflow-hidden"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                                    <img
                                        src={relatedProduct.image}
                                        alt={relatedProduct.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-[13px] font-bold text-primary mb-2 uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                                        {relatedProduct.name}
                                    </h3>
                                    <p className="text-xl font-bold text-primary">{relatedProduct.price}</p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
