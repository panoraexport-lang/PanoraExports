'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import {
    Package,
    Send,
    ArrowLeft,
    ShieldAlert,
    CheckCircle2,
    MessageCircle,
    FileText,
    BookOpen,
    ShoppingCart,
    CreditCard,
    Globe
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type InquiryType = 'ORDER' | 'QUOTE' | 'CATALOGUE' | 'WHATSAPP';

export default function TradeInquiryPage() {
    const { user, loading } = useAuth();
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    // Get params from URL
    const searchParams = new URLSearchParams(window.location.search);
    const productName = searchParams.get('product') || '';
    const typeParam = (searchParams.get('type') || 'QUOTE').toUpperCase() as InquiryType;

    const [formData, setFormData] = useState({
        productName: productName,
        quantity: '',
        companyName: '',
        contactPerson: '',
        address: '',
        notes: '',
        targetPrice: '',
        shippingMethod: 'SEA'
    });

    // Generate a unique verification/reference number for orders
    const [verificationNumber] = useState(() => `PAN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                companyName: user.company_name || prev.companyName,
                contactPerson: user.name || prev.contactPerson
            }));
        }
    }, [user]);

    useEffect(() => {
        if (!loading && (!user || user.verification_status !== 'VERIFIED')) {
            toast({
                title: "Institutional Verification Required",
                description: "This trade directive is restricted to verified business entities. Please complete verification.",
                variant: "destructive"
            });
            setLocation('/verification');
        }
    }, [user, loading, setLocation, toast]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user || user.verification_status !== 'VERIFIED') {
        return (
            <div className="min-h-screen bg-background pt-20 flex flex-col items-center justify-center px-6 text-primary">
                <ShieldAlert className="w-16 h-16 text-destructive mb-6" />
                <h1 className="text-2xl font-bold mb-4 uppercase tracking-tighter text-center">Unauthorized Access</h1>
                <p className="text-primary/60 text-center max-w-md mb-8">
                    Your institutional status must be verified before initiating trade directives.
                </p>
                <button
                    onClick={() => setLocation('/verification')}
                    className="px-8 py-4 bg-primary text-secondary font-black text-[10px] uppercase tracking-[0.2em] rounded-sm"
                >
                    Finalize Verification
                </button>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let header = '';
        let details = '';

        if (typeParam === 'ORDER') {
            header = `*OFFICIAL PURCHASE DIRECTIVE*`;
            details = `*Ref Number:* ${verificationNumber}\n` +
                `*Order Type:* Institutional Purchase\n` +
                `*Target Qty:* ${formData.quantity}\n` +
                `*Shipping:* ${formData.shippingMethod}\n`;
        } else if (typeParam === 'QUOTE') {
            header = `*INSTITUTIONAL QUOTE REQUEST*`;
            details = `*Requirement:* High-Volume Pricing\n` +
                `*Approx Qty:* ${formData.quantity}\n` +
                `*Target Price:* ${formData.targetPrice || 'Market Rate'}\n`;
        } else if (typeParam === 'CATALOGUE') {
            header = `*DIGITAL CATALOGUE REQUEST*`;
            details = `*Focus:* ${productName} Category\n` +
                `*Scale:* Enterprise Distribution\n`;
        } else if (typeParam === 'WHATSAPP') {
            header = `*SECURE WHATSAPP DIRECTIVE*`;
            details = `*Inquiry Type:* Direct Trade Consultation\n` +
                `*Urgency:* High Priority (Verified)\n`;
        }

        const message = `${header}\n\n` +
            `*Product:* ${formData.productName}\n` +
            details +
            `*Business:* ${formData.companyName}\n` +
            `*Representative:* ${formData.contactPerson}\n` +
            (user.registration_id ? `*Reg ID:* ${user.registration_id}\n` : '') +
            `*Location:* ${formData.address}\n` +
            `*Directive Notes:* ${formData.notes}\n\n` +
            `_Security Credentials: ${user.id.substr(0, 8)} | Verified Account_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919005230333?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        toast({
            title: "Directive Generated",
            description: "Your secure trade request has been prepared for WhatsApp.",
        });
    };

    const getIcon = () => {
        switch (typeParam) {
            case 'ORDER': return <ShoppingCart className="w-5 h-5" />;
            case 'QUOTE': return <FileText className="w-5 h-5" />;
            case 'CATALOGUE': return <BookOpen className="w-5 h-5" />;
            case 'WHATSAPP': return <MessageCircle className="w-5 h-5" />;
        }
    };

    const getTitle = () => {
        switch (typeParam) {
            case 'ORDER': return "Start Order";
            case 'QUOTE': return "Institutional Quote";
            case 'CATALOGUE': return "Request Catalogue";
            case 'WHATSAPP': return "Direct Inquiry";
        }
    };

    return (
        <div className="min-h-screen bg-background pt-20 font-sans antialiased text-primary">
            <Navigation />

            <section className="max-w-4xl mx-auto px-8 py-20">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary mb-12 transition-all group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Product
                </button>

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest mb-8 border border-secondary/20 rounded-sm">
                        {getIcon()}
                        Secure Trade Channel
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter">
                        {getTitle()?.split(' ')[0]} <span className="font-serif italic font-light text-secondary">{getTitle()?.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="text-primary/60 text-lg font-medium max-w-xl mx-auto">
                        Initiate high-volume fulfillment protocols. Every directive is encrypted and routed to our executive trade commissioners.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-background border border-border p-8 md:p-12 rounded-sm shadow-sm"
                >
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {typeParam === 'ORDER' && (
                            <div className="p-4 bg-secondary/30 border border-secondary/20 rounded-sm mb-10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert className="w-4 h-4 text-secondary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Official Order Ref:</span>
                                </div>
                                <span className="text-sm font-black text-primary font-mono">{verificationNumber}</span>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Product Directive</label>
                                <input
                                    required
                                    value={formData.productName}
                                    readOnly
                                    className="w-full bg-transparent border-b border-primary/20 px-0 py-3 outline-none opacity-60 font-bold text-lg"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Target Volume / Quantity</label>
                                <input
                                    required
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                    placeholder="e.g. 50 Tons, 5000 Units"
                                />
                            </div>
                        </div>

                        {typeParam === 'QUOTE' && (
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Target Price (Optional)</label>
                                    <input
                                        value={formData.targetPrice}
                                        onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                                        className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                        placeholder="e.g. $12.50 per unit"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Currency Basis</label>
                                    <select className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all text-primary font-medium">
                                        <option>USD - United States Dollar</option>
                                        <option>EUR - Euro</option>
                                        <option>AED - UAE Dirham</option>
                                        <option>GBP - British Pound</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Corporate Entity</label>
                                <input
                                    required
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                    placeholder="Legal Business Name"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Authorized Signatory</label>
                                <input
                                    required
                                    value={formData.contactPerson}
                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                    className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                    placeholder="Representative Full Name"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Distribution / Delivery Point</label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 min-h-[80px] resize-y text-primary font-medium"
                                placeholder="Port of Entry or Corporate Warehouse Address"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Trade Specifications / Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 min-h-[80px] resize-y text-primary font-medium"
                                placeholder="Packaging specs, inspection requirements, or specific trade terms..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-secondary py-5 text-[11px] uppercase tracking-[0.3em] font-black hover:opacity-90 transition-all flex items-center justify-center gap-4 rounded-sm shadow-xl mt-10"
                        >
                            Execute Directive <MessageCircle className="w-5 h-5 fill-secondary" />
                        </button>
                    </form>
                </motion.div>
            </section>
        </div>
    );
}
