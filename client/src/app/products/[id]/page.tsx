'use client';

import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Package, Shield, Truck, Star, Share2, Globe, FileText, Mail, BookOpen, Download, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { API_BASE_URL } from '@/lib/api-config';

export default function ProductDetailPage() {
    const params = useParams();
    const { user } = useAuth();
    const { toast } = useToast();
    const [, setLocation] = useLocation();
    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProductDetails = async () => {
        if (!params.id) return;
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/products/${params.id}`);
            if (!response.ok) throw new Error('Product not found');
            const data = await response.json();

            // Transform data
            let imageUrl = data.image || '';
            try {
                if (data.images) {
                    const parsed = typeof data.images === 'string' ? JSON.parse(data.images) : data.images;
                    imageUrl = Array.isArray(parsed) ? parsed[0] : parsed;
                }
            } catch (e) { }

            const transformedProduct = {
                id: data.id,
                name: data.name,
                category: data.category?.name || 'General',
                price: data.priceRange || 'By Quote',
                supplier: data.seller?.name || 'Verified Supplier',
                image: imageUrl,
                verified: data.isActive,
                description: data.description || 'No description provided.',
                minOrder: data.minOrderQuantity ? `${data.minOrderQuantity} units` : 'Contact for MOQ',
                leadTime: '15-20 days',
                rating: 4.8,
                reviews: 45,
                originState: data.originState,
                variants: data.variants ? (typeof data.variants === 'string' ? JSON.parse(data.variants) : data.variants) : [],
                specs: [
                    { label: 'Market Origin', value: data.originState ? `State of ${data.originState}, India` : (data.originCountry || 'India') },
                    { label: 'HS Code', value: data.hsCode || 'Available on request' },
                    { label: 'Currency', value: data.currency || 'USD' },
                    { label: 'Processing', value: 'Graded & Quality Checked' }
                ]
            };

            setProduct(transformedProduct);

            // Fetch related products (same category)
            const allRes = await fetch(`${API_BASE_URL}/products`);
            if (allRes.ok) {
                const allData = await allRes.json();
                const filtered = allData
                    .filter((p: any) => p.categoryId === data.categoryId && p.id !== data.id)
                    .slice(0, 4)
                    .map((p: any) => ({
                        id: p.id,
                        name: p.name,
                        price: p.priceRange || 'By Quote',
                        image: (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images?.[0]) || p.image || ''
                    }));
                setRelatedProducts(filtered);
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [params.id]);

    const handleSecuredAction = (type: string) => {
        if (!user || user.verification_status !== 'VERIFIED') {
            toast({
                title: "Institutional Partnership Awaits",
                description: "Complete your business verification to unlock global trade features.",
            });
            setLocation('/verification');
            return;
        }

        if (!product) return;

        if (type === 'SAMPLE') {
            setLocation(`/samples/request?product=${encodeURIComponent(product.name)}`);
        } else if (type === 'CUSTOM_SIZE') {
            setLocation(`/trade-inquiry?product=${encodeURIComponent(product.name)}&type=CUSTOM_SPECIFICATION`);
        } else {
            setLocation(`/trade-inquiry?product=${encodeURIComponent(product.name)}&type=${type}`);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
                <Navigation />
                <div className="flex flex-col items-center gap-4">
                    <Package className="w-12 h-12 text-primary animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">Loading Specifications...</p>
                </div>
            </div>
        );
    }

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
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-primary text-[9px] font-bold uppercase tracking-widest block px-3 py-1 bg-secondary w-fit rounded-sm">
                                    {product.category}
                                </span>
                                {product.originState && (
                                    <span className="text-secondary text-[9px] font-bold uppercase tracking-widest block px-3 py-1 bg-secondary/10 w-fit rounded-sm border border-secondary/20">
                                        Source: {product.originState}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 leading-[1.1] tracking-tight uppercase">
                                {product.name}
                            </h1>
                            {product.originState && (
                                <p className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-6">
                                    Direct from the State of {product.originState}
                                </p>
                            )}

                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                                <div>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Commercial Status</p>
                                    <p className="text-2xl font-bold text-primary italic">Price via Meeting</p>
                                </div>
                                <div className="h-10 w-[1px] bg-border" />
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
                                        {product.rating} (45 Reviews)
                                    </span>
                                </div>
                            </div>

                            {/* Size Grading System */}
                            {product.variants && product.variants.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        Advanced Size Grading System
                                    </h3>
                                    <div className="grid gap-3">
                                        {product.variants.map((v: any, i: number) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-secondary/20 border border-border hover:border-primary/30 transition-all rounded-sm group">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{v.size}</span>
                                                    <span className="text-[11px] font-medium text-primary/60">{v.description}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">Commercial Status</span>
                                                    <span className="text-sm font-black text-primary uppercase">Quote via Meeting</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-[10px] italic text-primary/40 font-medium">
                                        * Final commercial terms and logistics pricing will be established during the institutional meeting.
                                    </p>
                                </div>
                            )}

                            {/* Custom Size Option */}
                            <div className="mt-8 p-6 bg-primary/5 border border-dashed border-primary/20 rounded-sm">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-2">
                                            <Globe className="w-3.5 h-3.5" />
                                            Bespoke Requirements?
                                        </h4>
                                        <p className="text-[12px] text-primary/60 font-medium leading-relaxed">
                                            We provide customized grading and precision size specifications tailored for unique institutional or manufacturing requirements.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => handleSecuredAction('CUSTOM_SIZE')}
                                        className="w-full sm:w-auto shrink-0 px-6 py-3 bg-secondary text-primary text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-secondary/80 transition-all border border-secondary/30"
                                    >
                                        Apply for Custom Size
                                    </button>
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
                                {product.specs?.map((spec: any, i: number) => (
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
