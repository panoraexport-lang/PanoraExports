'use client';

import { Shield, CheckCircle2, FileText, Globe, Building2, TrendingUp, Upload, Mail, User, Phone, MapPin, AlertCircle, Loader2, ShoppingCart, Package, MessageSquare, FileCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
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

type CountryConfig = {
    code: string;
    name: string;
    idLabel: string;
    idPlaceholder: string;
    idRegex: RegExp;
    phoneCode: string;
    phoneRegex: RegExp;
};

const TRADING_PARTNERS: CountryConfig[] = [
    {
        code: 'INDIA',
        name: 'India',
        idLabel: 'GST Registration Number',
        idPlaceholder: '22AAAAA0000A1Z5',
        idRegex: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        phoneCode: '+91',
        phoneRegex: /^[6-9]\d{9}$/
    },
    {
        code: 'USA',
        name: 'United States',
        idLabel: 'EIN (Employer Identification Number)',
        idPlaceholder: '12-3456789',
        idRegex: /^\d{2}-?\d{7}$|^\d{9}$/,
        phoneCode: '+1',
        phoneRegex: /^\d{10}$/
    },
    {
        code: 'UAE',
        name: 'United Arab Emirates',
        idLabel: 'Trade License Number',
        idPlaceholder: 'CN-123456',
        idRegex: /^[A-Z0-9-]{5,}$/,
        phoneCode: '+971',
        phoneRegex: /^(50|51|52|54|55|56|58)\d{7}$/
    },
    {
        code: 'CHINA',
        name: 'China',
        idLabel: 'Unified Social Credit Code',
        idPlaceholder: '91350100M000100Y43',
        idRegex: /^[0-9A-Z]{18}$/,
        phoneCode: '+86',
        phoneRegex: /^1[3-9]\d{9}$/
    },
    {
        code: 'UK',
        name: 'United Kingdom',
        idLabel: 'Company Registration Number',
        idPlaceholder: '12345678',
        idRegex: /^([0-9]{8}|[A-Z]{2}[0-9]{6})$/,
        phoneCode: '+44',
        phoneRegex: /^7\d{9}$/
    },
    {
        code: 'SINGAPORE',
        name: 'Singapore',
        idLabel: 'UEN (Unique Entity Number)',
        idPlaceholder: '200812345M',
        idRegex: /^[0-9A-Z]{9,10}$/,
        phoneCode: '+65',
        phoneRegex: /^[89]\d{7}$/
    },
    {
        code: 'SAUDI_ARABIA',
        name: 'Saudi Arabia',
        idLabel: 'VAT / CR Number',
        idPlaceholder: '1010000000',
        idRegex: /^[0-9]{10,15}$/,
        phoneCode: '+966',
        phoneRegex: /^5\d{8}$/
    },
    {
        code: 'GERMANY',
        name: 'Germany',
        idLabel: 'Handelsregister / VAT ID',
        idPlaceholder: 'HRB 12345',
        idRegex: /^[A-Z0-9\s-]{5,}$/,
        phoneCode: '+49',
        phoneRegex: /^1\d{1,13}$/
    },
    {
        code: 'JAPAN',
        name: 'Japan',
        idLabel: 'Corporate Number',
        idPlaceholder: '1234567890123',
        idRegex: /^\d{13}$/,
        phoneCode: '+81',
        phoneRegex: /^[0-9]{10}$/
    },
    {
        code: 'AUSTRALIA',
        name: 'Australia',
        idLabel: 'ABN / ACN',
        idPlaceholder: '51 824 753 556',
        idRegex: /^\d{11}|\d{9}$/,
        phoneCode: '+61',
        phoneRegex: /^4\d{8}$/
    },
    {
        code: 'RUSSIA',
        name: 'Russia',
        idLabel: 'INN',
        idPlaceholder: '7707083893',
        idRegex: /^\d{10}|\d{12}$/,
        phoneCode: '+7',
        phoneRegex: /^[0-9]{10}$/
    },
    {
        code: 'FRANCE',
        name: 'France',
        idLabel: 'SIREN / SIRET',
        idPlaceholder: '123 456 789',
        idRegex: /^\d{9}|\d{14}$/,
        phoneCode: '+33',
        phoneRegex: /^[0-9]{9}$/
    },
    {
        code: 'ITALY',
        name: 'Italy',
        idLabel: 'Partita IVA (VAT)',
        idPlaceholder: '12345678901',
        idRegex: /^\d{11}$/,
        phoneCode: '+39',
        phoneRegex: /^[0-9]{10}$/
    },
    {
        code: 'INDONESIA',
        name: 'Indonesia',
        idLabel: 'NIB (Business ID)',
        idPlaceholder: '1234567890123',
        idRegex: /^\d{13}$/,
        phoneCode: '+62',
        phoneRegex: /^8\d{9,11}$/
    },
    {
        code: 'VIETNAM',
        name: 'Vietnam',
        idLabel: 'Enterprise Reg. No.',
        idPlaceholder: '0101234567',
        idRegex: /^\d{10}|\d{13}$/,
        phoneCode: '+84',
        phoneRegex: /^[0-9]{9}$/
    }
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

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const validateInput = (): boolean => {
        const errors: { [key: string]: string } = {};
        const selectedCountry = TRADING_PARTNERS.find(c => c.code === formData.country);

        if (!selectedCountry) {
            // Fallback for custom logic if unexpected
            return true;
        }

        // Validate Business ID
        if (!selectedCountry.idRegex.test(formData.businessId.replace(/[^a-zA-Z0-9]/g, ''))) {
            errors.businessId = `Invalid ${selectedCountry.idLabel} format for ${selectedCountry.name}`;
        }

        // Validate Phone Number
        let phoneDigits = formData.phone.replace(/\D/g, '');
        const countryCodeDigits = selectedCountry.phoneCode.replace('+', '');

        // If phone starts with country code, check if the *remainder* matches the local pattern
        // logic: if starts with cc, try stripping it. If stripped version works, use it.
        // otherwise, test the original (in case the number just happens to start with those digits but isn't a CC prefix, though unlikely for lengths)
        if (phoneDigits.startsWith(countryCodeDigits)) {
            const stripped = phoneDigits.slice(countryCodeDigits.length);
            if (selectedCountry.phoneRegex.test(stripped)) {
                // It was a valid full number
                phoneDigits = stripped;
            }
        }

        if (!selectedCountry.phoneRegex.test(phoneDigits)) {
            errors.phone = `Invalid phone number format for ${selectedCountry.name}. Expected ${selectedCountry.phoneCode} followed by local number.`;
        }

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            toast({
                title: 'Validation Error',
                description: Object.values(errors)[0],
                variant: 'destructive',
            });
            return false;
        }
        return true;
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }

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
            <div className="min-h-screen bg-background pt-20 font-sans antialiased text-primary">
                <Navigation />

                {/* Success Header */}
                <section className="bg-secondary/30 border-b border-border">
                    <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-16">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 bg-background rounded-sm flex items-center justify-center border border-border">
                                <CheckCircle2 className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
                                        {verificationResult.businessName || formData.businessName}
                                    </h1>
                                    <span className="px-3 py-1 bg-primary text-primary-foreground text-[9px] font-bold rounded-sm uppercase tracking-widest">
                                        Verified
                                    </span>
                                </div>
                                <p className="text-[11px] text-primary/60 uppercase font-bold tracking-widest">
                                    {verificationResult.verificationType} • {verificationResult.country}
                                </p>
                            </div>
                        </div>
                        <p className="text-primary/70 text-lg max-w-xl font-medium leading-relaxed">
                            Verification complete. Your business is now verified and ready to trade on Panora Exports.
                        </p>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="max-w-[1600px] mx-auto px-8 md:px-12 py-16">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-8 h-[1.5px] bg-primary" />
                        <h2 className="text-[9px] font-bold text-primary uppercase tracking-widest">
                            Dashboard Actions
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { href: '/products', icon: Package, title: 'Browse Products', desc: 'Explore our product inventory' },
                            { href: '/rfq/create', icon: FileCheck, title: 'Request Quote', desc: 'Create a sourcing inquiry' },
                            { href: '/products/add', icon: Upload, title: 'List Products', desc: 'Add your items to the platform' },
                            { href: '/messages', icon: MessageSquare, title: 'Messages', desc: 'Chat with trade partners' }
                        ].map((action, i) => (
                            <Link
                                key={i}
                                href={action.href}
                                className="group p-8 bg-background border border-border hover:border-primary/20 transition-all rounded-sm"
                            >
                                <div className="w-12 h-12 bg-secondary rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-secondary transition-all">
                                    <action.icon className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-2 tracking-tight">
                                    {action.title}
                                </h3>
                                <p className="text-[13px] text-primary/60 font-medium leading-relaxed">
                                    {action.desc}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Platform Features */}
                <section className="bg-secondary/30 border-y border-border">
                    <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-20">
                        <div className="grid md:grid-cols-3 gap-12">
                            {[
                                { title: 'Priority Listings', desc: 'Your products appear first in search results' },
                                { title: 'Verified Badge', desc: 'Trust badge displayed on your business profile' },
                                { title: 'Direct Messaging', desc: 'Connect directly with global buyers and sellers' },
                                { title: 'RFQ Access', desc: 'Submit and respond to sourcing requests' },
                                { title: 'Secure Trade', desc: 'Access to verified trade partners only' },
                                { title: 'Trade Analytics', desc: 'Insights into market trends and performance' }
                            ].map((benefit, i) => (
                                <div key={i} className="flex gap-4">
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-[13px] text-primary/60 font-medium leading-normal">
                                            {benefit.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="max-w-[1600px] mx-auto px-8 md:px-12 py-20">
                    <div className="bg-primary p-12 md:p-20 text-center rounded-sm relative overflow-hidden">
                        <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 tracking-tight">
                            Start Trading <br />
                            <span className="font-serif italic font-light opacity-80">Globally.</span>
                        </h2>
                        <p className="text-lg text-secondary/60 mb-10 max-w-xl mx-auto font-medium">
                            Your business is verified. You can now access the full power of our global trade network.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/products"
                                className="px-10 py-4 bg-secondary text-primary font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all rounded-sm"
                            >
                                Browse Products
                            </Link>
                            <Link
                                href="/products/add"
                                className="px-10 py-4 border border-secondary text-secondary font-bold text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all rounded-sm"
                            >
                                Add Product
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 font-sans antialiased text-primary">
            <Navigation />

            {/* Hero Section */}
            <section className="bg-background">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-20 md:py-24">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 bg-secondary text-primary border border-border rounded-sm">
                            <Shield className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Business Verification</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 tracking-tight leading-tight">
                            Get Verified. <br />
                            <span className="font-serif italic font-light opacity-80">Start Trading.</span>
                        </h1>
                        <p className="text-lg text-primary/60 mb-10 leading-relaxed font-medium max-w-xl">
                            Verify your business with our automated system for India, EU, USA, UK, UAE, and other global markets.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-border bg-secondary/30">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { val: '500+', label: 'Verified Partners' },
                            { val: '25+', label: 'Global Markets' },
                            { val: 'Instant', label: 'Verification' },
                            { val: '99%', label: 'Trust Rate' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="text-4xl font-bold text-primary mb-1 tracking-tight">{stat.val}</p>
                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Verification Form */}
            <section className="max-w-4xl mx-auto px-8 py-20">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-[1.5px] w-8 bg-primary" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Verification Form</span>
                        <div className="h-[1.5px] w-8 bg-primary" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
                        Business <span className="font-serif italic font-light opacity-80">Verification</span>
                    </h2>
                    <p className="text-lg text-primary/60 font-medium max-w-xl mx-auto">
                        Provide your business details for automated international verification.
                    </p>
                </div>

                <form onSubmit={handleVerify} className="border border-border p-8 md:p-12 bg-background rounded-sm shadow-sm">
                    {/* Business Information */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-8 h-8 bg-secondary border border-border rounded-sm flex items-center justify-center text-primary font-bold text-xs">01</div>
                            <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">Business Details</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-2.5">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                    className="w-full px-0 py-3 border-b border-border bg-transparent text-primary font-medium focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/30 text-base"
                                    placeholder="Registered business name"
                                />
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                                    Business Type
                                </label>
                                <select
                                    required
                                    value={formData.businessType}
                                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                                    className="w-full px-0 py-3 border-b border-border bg-transparent text-primary font-medium focus:outline-none focus:border-primary transition-all text-base appearance-none cursor-pointer"
                                >
                                    <option value="SELLER">Merchant / Exporter</option>
                                    <option value="BUYER">Importer / Buyer</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-8 h-8 bg-secondary border border-border rounded-sm flex items-center justify-center text-primary font-bold text-xs">02</div>
                            <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">Contact Information</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-2.5">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.contactName}
                                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                    className="w-full px-0 py-3 border-b border-border bg-transparent text-primary font-medium focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/30 text-base"
                                    placeholder="Enter name"
                                />
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                                    Business Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-0 py-3 border-b border-border bg-transparent text-primary font-medium focus:outline-none focus:border-primary transition-all placeholder:text-muted-foreground/30 text-base"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                                    Phone ({TRADING_PARTNERS.find(c => c.code === formData.country)?.phoneCode || '+91'})
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className={`w-full px-0 py-3 border-b bg-transparent text-primary font-medium focus:outline-none transition-all placeholder:text-muted-foreground/30 text-base ${formErrors.phone ? 'border-destructive text-destructive' : 'border-border focus:border-primary'}`}
                                    placeholder={TRADING_PARTNERS.find(c => c.code === formData.country)?.phoneCode || '+91'}
                                />
                                {formErrors.phone && (
                                    <p className="text-[10px] text-destructive font-medium mt-1">{formErrors.phone}</p>
                                )}
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                                    Country
                                </label>
                                <select
                                    required
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    className="w-full px-0 py-3 border-b border-border bg-transparent text-primary font-medium focus:outline-none focus:border-primary transition-all text-base appearance-none cursor-pointer"
                                    style={{
                                        backgroundImage: 'none' // Remove default arrow if needed, but standard select usually fine
                                    }}
                                >
                                    {TRADING_PARTNERS.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.name} ({country.idLabel.split(' ')[0]})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ID Information */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-8 h-8 bg-secondary border border-border rounded-sm flex items-center justify-center text-primary font-bold text-xs">03</div>
                            <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">Registration ID</h3>
                        </div>

                        <div className="space-y-2.5">
                            <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                                {TRADING_PARTNERS.find(c => c.code === formData.country)?.idLabel || 'Registration Number'}
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.businessId}
                                onChange={(e) => setFormData({ ...formData, businessId: e.target.value })}
                                className={`w-full px-0 py-4 border-b bg-transparent text-primary font-bold focus:outline-none transition-all placeholder:text-muted-foreground/30 text-2xl tracking-tight ${formErrors.businessId ? 'border-destructive text-destructive' : 'border-border focus:border-primary'}`}
                                placeholder={TRADING_PARTNERS.find(c => c.code === formData.country)?.idPlaceholder || 'Enter business ID'}
                            />
                            {formErrors.businessId && (
                                <p className="text-[10px] text-destructive font-medium mt-1">{formErrors.businessId}</p>
                            )}
                        </div>
                    </div>

                    {/* Result */}
                    {verificationResult && (
                        <div className={`mb-10 p-8 rounded-sm border ${verificationResult.verified ? 'border-primary/20 bg-primary/5' : 'border-primary/10 bg-primary/5'}`}>
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-sm flex items-center justify-center shrink-0 ${verificationResult.verified ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'}`}>
                                    {verificationResult.verified ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`text-lg font-bold tracking-tight mb-2 text-primary`}>
                                        {verificationResult.verified ? 'Verification Successful' : 'Verification Failed'}
                                    </h4>
                                    <p className="text-[13px] text-primary/60 font-medium leading-relaxed">
                                        {verificationResult.note || verificationResult.reason}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isVerifying}
                        className="w-full bg-primary text-primary-foreground py-5 text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded-sm flex items-center justify-center gap-3 shadow-md"
                    >
                        {isVerifying ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                <Shield className="w-4 h-4" />
                                Verify Business
                            </>
                        )}
                    </button>
                </form>
            </section>

            {/* Steps */}
            <section className="bg-secondary/30 py-20 border-y border-border">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="grid md:grid-cols-3 gap-12">
                        {verificationSteps.map((step) => (
                            <div key={step.step}>
                                <div className="w-12 h-12 bg-background border border-border flex items-center justify-center mb-8 rounded-sm">
                                    <step.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-primary/60 leading-relaxed font-medium text-sm">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Access */}
            <section className="bg-background py-20">
                <div className="max-w-[1400px] mx-auto px-8 md:px-12">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-8 h-[1.5px] bg-primary" />
                        <h2 className="text-[9px] font-bold text-primary uppercase tracking-widest">
                            Global Advantage
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index}>
                                <div className="w-16 h-16 bg-secondary border border-border flex items-center justify-center mb-8 rounded-sm">
                                    <benefit.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-3 uppercase tracking-tight">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-primary/60 font-medium leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
