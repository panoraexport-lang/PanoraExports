import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, User, Phone, Globe, Building2, ShoppingBag } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'BUYER' | 'SELLER' | null;

export default function RegisterPage() {
    const [, setLocation] = useLocation();
    const { register } = useAuth();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<UserRole>('BUYER');
    const [step, setStep] = useState<1 | 2>(2);

    const [formData, setFormData] = useState({
        // Step 1
        name: '',
        email: '',
        phone: '',
        country: 'India',
        password: '',
        confirmPassword: '',
        // Step 2 (optional based on role)
        companyName: '',
        agreedToTerms: false,
    });

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role);
        setTimeout(() => setStep(2), 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match!',
                variant: 'destructive',
            });
            return;
        }

        if (formData.password.length < 8) {
            toast({
                title: 'Error',
                description: 'Password must be at least 8 characters long',
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await register({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                phone: formData.phone,
                country: formData.country,
                role: selectedRole!,
                companyName: formData.companyName,
            });

            if (error) {
                toast({
                    title: 'Registration Failed',
                    description: error.message || 'An error occurred during registration',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Success!',
                    description: 'Account created successfully. Please check your email to verify your account.',
                });
                // Redirect to verification page or dashboard
                setTimeout(() => {
                    setLocation('/verification');
                }, 2000);
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'An unexpected error occurred',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBD4] dark:bg-slate-950 flex items-center justify-center px-6 py-12">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <div className="w-full max-w-2xl relative z-10">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <a href="/" className="inline-block">
                        <h1 className="font-luxury-heading text-5xl italic font-bold text-slate-900 dark:text-white">
                            Panora<span className="text-[#C05800]">Exports</span>
                        </h1>
                    </a>
                    <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm uppercase tracking-[0.3em]">
                        Join India's Premier Export Platform
                    </p>
                </motion.div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-[#C05800] scale-125' : 'bg-slate-300 dark:bg-slate-700'}`} />
                    <div className={`w-16 h-px ${step >= 2 ? 'bg-[#C05800]' : 'bg-slate-300 dark:bg-slate-700'} transition-all duration-300`} />
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-[#C05800] scale-125' : 'bg-slate-300 dark:bg-slate-700'}`} />
                </div>

                <AnimatePresence mode="wait">
                    {/* Step 1 Removed as per user request to only have Customer accounts */}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white dark:bg-slate-900 border border-[#C05800]/20 shadow-2xl p-10 md:p-12"
                        >
                            <div className="mb-8">
                                <h2 className="font-luxury-heading text-3xl md:text-4xl italic text-slate-900 dark:text-white mb-3">
                                    Create Account
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    Register for a <span className="text-[#C05800] font-medium italic">Customer</span> account
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2 group">
                                        <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium group-focus-within:text-[#C05800] transition-colors">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#C05800] transition-colors" />
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-8 pr-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2 group">
                                        <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium group-focus-within:text-[#C05800] transition-colors">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#C05800] transition-colors" />
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full pl-8 pr-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Phone */}
                                    <div className="space-y-2 group">
                                        <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium group-focus-within:text-[#C05800] transition-colors">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#C05800] transition-colors" />
                                            <input
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-8 pr-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>

                                    {/* Country */}
                                    <div className="space-y-2 group">
                                        <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium group-focus-within:text-[#C05800] transition-colors">
                                            Country *
                                        </label>
                                        <div className="relative">
                                            <Globe className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#C05800] transition-colors" />
                                            <select
                                                required
                                                value={formData.country}
                                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                className="w-full pl-8 pr-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white appearance-none"
                                            >
                                                <option value="India">India</option>
                                                <option value="USA">United States</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="UAE">UAE</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Name (for sellers mainly) */}
                                {selectedRole === 'SELLER' && (
                                    <div className="space-y-2 group">
                                        <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium group-focus-within:text-[#C05800] transition-colors">
                                            Company Name *
                                        </label>
                                        <div className="relative">
                                            <Building2 className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#C05800] transition-colors" />
                                            <input
                                                type="text"
                                                required={selectedRole === 'SELLER'}
                                                value={formData.companyName}
                                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                className="w-full pl-8 pr-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white"
                                                placeholder="Your Company Pvt Ltd"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Password */}
                                    <div className="space-y-2 group">
                                        <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium group-focus-within:text-[#C05800] transition-colors">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#C05800] transition-colors" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full pl-8 pr-12 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white"
                                                placeholder="••••••••"
                                                minLength={8}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#C05800] transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2 group">
                                        <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium group-focus-within:text-[#C05800] transition-colors">
                                            Confirm Password *
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#C05800] transition-colors" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                required
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                className="w-full pl-8 pr-12 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white"
                                                placeholder="••••••••"
                                                minLength={8}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#C05800] transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms Agreement */}
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={formData.agreedToTerms}
                                        onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                                        className="mt-1 w-4 h-4 border border-slate-300 dark:border-slate-600 rounded accent-[#C05800]"
                                    />
                                    <label className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        I agree to Panora Exports{' '}
                                        <a href="/terms" className="text-[#C05800] hover:underline">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="/privacy" className="text-[#C05800] hover:underline">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#C05800] text-white py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#c19b2f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl mt-8"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Back to Home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-8"
                >
                    <a
                        href="/"
                        className="text-sm text-slate-500 dark:text-slate-400 hover:text-[#C05800] transition-colors inline-flex items-center gap-2"
                    >
                        ← Back to Home
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
