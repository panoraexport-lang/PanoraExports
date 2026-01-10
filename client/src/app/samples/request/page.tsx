'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Package, Send, ArrowLeft, ShieldAlert, CheckCircle2, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function SampleRequestPage() {
    const { user, loading } = useAuth();
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    // Get product from query param
    const searchParams = new URLSearchParams(window.location.search);
    const productName = searchParams.get('product') || '';

    const [formData, setFormData] = useState({
        productName: productName,
        quantity: '',
        companyName: '',
        contactPerson: '',
        address: '',
        notes: ''
    });

    // Update form data when user is loaded
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
                title: "Authentication Required",
                description: "Only verified businesses can request samples. Please complete your verification first.",
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
            <div className="min-h-screen bg-background pt-20 flex flex-col items-center justify-center px-6">
                <ShieldAlert className="w-16 h-16 text-destructive mb-6" />
                <h1 className="text-2xl font-bold text-primary mb-4 uppercase tracking-tighter text-center">Verification Required</h1>
                <p className="text-primary/60 text-center max-w-md mb-8">
                    Your institutional sample request cannot be processed until your business account is fully verified.
                </p>
                <button
                    onClick={() => setLocation('/verification')}
                    className="px-8 py-4 bg-primary text-secondary font-black text-[10px] uppercase tracking-[0.2em] rounded-sm"
                >
                    Start Verification
                </button>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate WhatsApp message
        const message = `*Sample Request via Panora Exports*\n\n` +
            `*Product:* ${formData.productName}\n` +
            `*Quantity:* ${formData.quantity}\n` +
            `*Company:* ${formData.companyName}\n` +
            `*Contact:* ${formData.contactPerson}\n` +
            `*Shipping Address:* ${formData.address}\n` +
            `*Notes:* ${formData.notes}\n\n` +
            `_Requested by verified account: ${user.email}_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919005230333?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        toast({
            title: "Request Prepared",
            description: "Your sample request has been generated for WhatsApp.",
        });
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
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Business Account
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter">
                        Sample <span className="font-serif italic font-light text-secondary">Procurement.</span>
                    </h1>
                    <p className="text-primary/60 text-lg font-medium max-w-xl mx-auto">
                        Provide your shipment directives below. We facilitate institutional samples for verified trade partners.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-background border border-border p-8 md:p-12 rounded-sm shadow-sm"
                >
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Product Information</label>
                                <input
                                    required
                                    value={formData.productName}
                                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                    className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-bold text-lg"
                                    placeholder="Product Name"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Quantity Needed</label>
                                <input
                                    required
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                    placeholder="e.g. 1kg, 5 meters, 10 units"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Company / Entity</label>
                                <input
                                    required
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                    placeholder="Legal Business Name"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Contact Representative</label>
                                <input
                                    required
                                    value={formData.contactPerson}
                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                    className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                    placeholder="Full Name"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Shipping Address</label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 min-h-[100px] resize-y text-primary font-medium"
                                placeholder="Full address including ZIP/Country"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Additional Directives / Notes</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full bg-transparent border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 min-h-[80px] resize-y text-primary font-medium"
                                placeholder="Any specific quality requirements or shipping preferences..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[hsl(var(--success))] text-white py-5 text-[11px] uppercase tracking-[0.3em] font-black hover:brightness-110 transition-all flex items-center justify-center gap-4 rounded-sm shadow-xl mt-10"
                        >
                            Submit Sample Request <MessageCircle className="w-5 h-5 fill-white" />
                        </button>
                    </form>
                </motion.div>
            </section>
        </div>
    );
}
