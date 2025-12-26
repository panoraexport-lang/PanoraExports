'use client';

import { Shield, CheckCircle2, FileText, Globe, Building2, TrendingUp, Upload, Mail, User, Phone, MapPin, AlertCircle, Loader2, ShoppingCart, Package, MessageSquare, FileCheck } from 'lucide-react';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface VerificationResult {
    verified: boolean;
    country: string;
    businessName?: string;
    verificationType: string;
    reason?: string;
    note?: string;
    nextStep?: string;
    error?: string;
}

const verificationSteps = [
    {
        step: '01',
        title: 'Instant Verification',
        description: 'Enter your business registration number for instant verification',
        icon: FileText,
    },
    {
        step: '02',
        title: 'Get Verified',
        description: 'Automated verification for supported countries (India, EU, USA, UK, UAE, etc.)',
        icon: CheckCircle2,
    },
    {
        step: '03',
        title: 'Start Trading',
        description: 'Access marketplace, create RFQs, and connect with verified businesses',
        icon: TrendingUp,
    },
];

const benefits = [
    {
        icon: Shield,
        title: 'Trust & Credibility',
        description: 'Build trust with verified buyers and sellers worldwide',
    },
    {
        icon: Globe,
        title: 'Global Access',
        description: 'Connect with verified businesses across 50+ countries',
    },
    {
        icon: TrendingUp,
        title: 'Increased Visibility',
        description: 'Verified businesses get priority in search results',
    },
    {
        icon: Building2,
        title: 'Secure Transactions',
        description: 'All verified members undergo thorough background checks',
    },
];

const faqs = [
    {
        question: 'What documents do I need for verification?',
        answer: 'Indian businesses need GST registration. International buyers need EIN (USA), VAT (EU/UK), or ABN (Australia). We support automated verification for most countries.',
    },
    {
        question: 'How long does verification take?',
        answer: 'Automated verification is instant for supported countries. Manual verification takes 24-48 hours.',
    },
    {
        question: 'Which countries are supported?',
        answer: 'We support India (GST), EU countries (VAT), USA (EIN), UK (Company Number), UAE (Trade License), Canada (Business Number), and Australia (ABN).',
    },
    {
        question: 'What happens after verification?',
        answer: 'Once verified, you can access all platform features including product listings, RFQ submissions, direct messaging, and secure transactions.',
    },
];

export default function VerificationPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
    const [showVerifiedDashboard, setShowVerifiedDashboard] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        country: 'INDIA',
        businessType: 'SELLER',
        businessId: '',
    });

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setVerificationResult(null);

        try {
            const response = await fetch(`${API_URL}/verification/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    country: formData.country,
                    businessId: formData.businessId,
                }),
            });

            const result: VerificationResult = await response.json();
            setVerificationResult(result);

            if (result.verified) {
                toast({
                    title: '✅ Business Verified!',
                    description: `${result.businessName || 'Your business'} has been successfully verified.`,
                });

                // Show verified dashboard after 2 seconds
                setTimeout(() => {
                    setShowVerifiedDashboard(true);
                }, 2000);
            } else {
                toast({
                    title: '❌ Verification Failed',
                    description: result.reason || 'Unable to verify business registration.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Verification error:', error);
            toast({
                title: 'Error',
                description: 'Failed to connect to verification service. Please try again.',
                variant: 'destructive',
            });
            setVerificationResult({
                verified: false,
                country: formData.country,
                verificationType: 'Error',
                error: 'Network error. Please try again.',
            });
        } finally {
            setIsVerifying(false);
        }
    };

    // Verified User Dashboard
    if (showVerifiedDashboard && verificationResult?.verified) {
        return (
            <div className="min-h-screen bg-[#FDFBD4] dark:bg-[#38240D] pt-20">
                <Navigation />

                {/* Success Header */}
                <section className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                    <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                        {verificationResult.businessName || formData.businessName}
                                    </h1>
                                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                                        VERIFIED
                                    </span>
                                </div>
                                <p className="text-lg text-slate-600 dark:text-slate-400">
                                    {verificationResult.verificationType} • {verificationResult.country}
                                </p>
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                            Congratulations! Your business is now verified. You can now access all platform features and start trading with confidence.
                        </p>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="max-w-[1600px] mx-auto px-8 md:px-12 py-16">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                        What would you like to do?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <a
                            href="/products"
                            className="group border border-slate-200 dark:border-slate-800 p-8 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:shadow-lg"
                        >
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                Browse Products
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Explore our catalog of verified products from trusted sellers
                            </p>
                        </a>

                        <a
                            href="/rfq/create"
                            className="group border border-slate-200 dark:border-slate-800 p-8 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:shadow-lg"
                        >
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                Create RFQ
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Request quotes from verified sellers for your requirements
                            </p>
                        </a>

                        <a
                            href="/products/add"
                            className="group border border-slate-200 dark:border-slate-800 p-8 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:shadow-lg"
                        >
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                List Products
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Add your products to reach verified buyers worldwide
                            </p>
                        </a>

                        <a
                            href="/messages"
                            className="group border border-slate-200 dark:border-slate-800 p-8 hover:border-slate-400 dark:hover:border-slate-600 transition-all hover:shadow-lg"
                        >
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                Messages
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Connect directly with verified buyers and sellers
                            </p>
                        </a>
                    </div>
                </section>

                {/* Platform Features */}
                <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#C05800]/50">
                    <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-16">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                            Your Verified Benefits
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                        Priority Listings
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Your products appear first in search results
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                        Verified Badge
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Build trust with the verified badge on your profile
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                        Direct Messaging
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Connect directly with other verified businesses
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                        RFQ Access
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Submit and respond to requests for quotations
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                        Secure Payments
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Access to escrow and secure payment options
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                                        Analytics Dashboard
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Track your performance and business insights
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-[1600px] mx-auto px-8 md:px-12 py-16">
                    <div className="border border-slate-200 dark:border-slate-800 p-12 text-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Ready to Start Trading?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                            Your business is verified and ready to go. Explore our marketplace or list your first product.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <a
                                href="/products"
                                className="px-8 py-4 bg-[#C05800] dark:bg-[#FDFBD4] text-white dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity"
                            >
                                Browse Products
                            </a>
                            <a
                                href="/products/add"
                                className="px-8 py-4 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-[#C05800] transition-colors"
                            >
                                List Your Products
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBD4] dark:bg-[#38240D] pt-20">
            <Navigation />

            {/* Hero Section */}
            <section className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#C05800]/50">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm">
                            <Shield className="w-4 h-4" />
                            <span className="font-medium">Instant Verification Available</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                            Get Verified,<br />Start Trading
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Verify your business instantly with automated verification for India, EU, USA, UK, UAE, Canada, and Australia. No manual review needed for supported countries.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">500+</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Verified Businesses</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">50+</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Countries</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Instant</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Automated Verification</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">99.8%</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Success Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Verification Form */}
            <section className="max-w-4xl mx-auto px-8 md:px-12 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Verify Your Business
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Enter your business registration details for instant verification
                    </p>
                </div>

                <form onSubmit={handleVerify} className="border border-slate-200 dark:border-slate-800 p-8 md:p-12 bg-slate-50 dark:bg-[#C05800]/50">
                    {/* Business Information */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Business Information</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Business Name *
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.businessName}
                                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#C05800] text-slate-900 dark:text-white focus:outline-none focus:border-slate-500"
                                        placeholder="Your Company Pvt Ltd"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Business Type *
                                </label>
                                <select
                                    required
                                    value={formData.businessType}
                                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#C05800] text-slate-900 dark:text-white focus:outline-none focus:border-slate-500"
                                >
                                    <option value="SELLER">Seller/Exporter</option>
                                    <option value="BUYER">Buyer/Importer</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Contact Person *
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.contactName}
                                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#C05800] text-slate-900 dark:text-white focus:outline-none focus:border-slate-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Email Address *
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#C05800] text-slate-900 dark:text-white focus:outline-none focus:border-slate-500"
                                        placeholder="contact@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Phone Number *
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#C05800] text-slate-900 dark:text-white focus:outline-none focus:border-slate-500"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Country *
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <select
                                        required
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#C05800] text-slate-900 dark:text-white focus:outline-none focus:border-slate-500"
                                    >
                                        <option value="INDIA">India (GST)</option>
                                        <option value="USA">United States (EIN)</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="UAE">UAE</option>
                                        <option value="AUSTRALIA">Australia (ABN)</option>
                                        <option value="CANADA">Canada</option>
                                        <option value="GERMANY">Germany (VAT)</option>
                                        <option value="FRANCE">France (VAT)</option>
                                        <option value="ITALY">Italy (VAT)</option>
                                        <option value="SPAIN">Spain (VAT)</option>
                                        <option value="NETHERLANDS">Netherlands (VAT)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registration Number */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Business Registration</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Registration Number *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.businessId}
                                onChange={(e) => setFormData({ ...formData, businessId: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#C05800] text-slate-900 dark:text-white focus:outline-none focus:border-slate-500"
                                placeholder={
                                    formData.country === 'INDIA' ? '22AAAAA0000A1Z5' :
                                        formData.country === 'USA' ? '12-3456789' :
                                            formData.country === 'UK' ? 'AB123456' :
                                                formData.country === 'AUSTRALIA' ? '12345678901' :
                                                    formData.country === 'CANADA' ? '123456789' :
                                                        'DE123456789'
                                }
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {formData.country === 'INDIA' && 'Format: 15 characters (e.g., 22AAAAA0000A1Z5)'}
                                {formData.country === 'USA' && 'Format: XX-XXXXXXX (e.g., 12-3456789)'}
                                {formData.country === 'UK' && 'Format: 8 alphanumeric characters'}
                                {formData.country === 'AUSTRALIA' && 'Format: 11 digits'}
                                {formData.country === 'CANADA' && 'Format: 9 digits'}
                                {(formData.country === 'GERMANY' || formData.country === 'FRANCE' || formData.country === 'ITALY' || formData.country === 'SPAIN' || formData.country === 'NETHERLANDS') && 'Format: 2-letter country code + 8-12 digits'}
                            </p>
                        </div>
                    </div>

                    {/* Verification Result */}
                    {verificationResult && (
                        <div className={`mb-8 p-6 border ${verificationResult.verified ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'}`}>
                            <div className="flex items-start gap-4">
                                {verificationResult.verified ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                                ) : (
                                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                                )}
                                <div className="flex-1">
                                    <h4 className={`font-bold mb-2 ${verificationResult.verified ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                                        {verificationResult.verified ? 'Verification Successful!' : 'Verification Failed'}
                                    </h4>
                                    {verificationResult.businessName && (
                                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                                            <strong>Business Name:</strong> {verificationResult.businessName}
                                        </p>
                                    )}
                                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                                        <strong>Type:</strong> {verificationResult.verificationType}
                                    </p>
                                    {verificationResult.note && (
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                            {verificationResult.note}
                                        </p>
                                    )}
                                    {verificationResult.reason && (
                                        <p className="text-sm text-red-700 dark:text-red-300 mt-2">
                                            <strong>Reason:</strong> {verificationResult.reason}
                                        </p>
                                    )}
                                    {verificationResult.nextStep && (
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                            <strong>Next Step:</strong> {verificationResult.nextStep}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isVerifying}
                        className="w-full bg-[#C05800] dark:bg-[#FDFBD4] text-white dark:text-slate-900 py-4 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                <Shield className="w-5 h-5" />
                                Verify Business
                            </>
                        )}
                    </button>

                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                        Verification is instant for supported countries. Your data is encrypted and secure.
                    </p>
                </form>
            </section>

            {/* Verification Steps */}
            <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#C05800]/50">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            How Verification Works
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Simple, secure, and instant verification process
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {verificationSteps.map((step) => (
                            <div
                                key={step.step}
                                className="relative border border-slate-200 dark:border-slate-800 bg-[#FDFBD4] dark:bg-[#38240D] p-8 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
                            >
                                <div className="absolute -top-4 left-8 bg-[#FDFBD4] dark:bg-[#38240D] px-3">
                                    <span className="text-2xl font-bold text-slate-300 dark:text-slate-700">
                                        {step.step}
                                    </span>
                                </div>
                                <div className="w-12 h-12 bg-slate-100 dark:bg-[#C05800] flex items-center justify-center mb-6">
                                    <step.icon className="w-6 h-6 text-slate-900 dark:text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="max-w-[1600px] mx-auto px-8 md:px-12 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Benefits of Verification
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Why verified businesses succeed on our platform
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="text-center">
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto mb-4">
                                <benefit.icon className="w-8 h-8 text-slate-900 dark:text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#C05800]/50">
                <div className="max-w-3xl mx-auto px-8 py-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-slate-200 dark:border-slate-800 bg-[#FDFBD4] dark:bg-[#38240D]"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#C05800]/50 transition-colors"
                                >
                                    <span className="font-semibold text-slate-900 dark:text-white">
                                        {faq.question}
                                    </span>
                                    <span className="text-slate-400">
                                        {openFaq === index ? '−' : '+'}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
