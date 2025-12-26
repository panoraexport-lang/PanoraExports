import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { isAdminCredentials } from '@/lib/rbac';

export default function LoginPage() {
    const [, setLocation] = useLocation();
    const { login } = useAuth();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await login(formData.email, formData.password);

            if (error) {
                toast({
                    title: 'Login Failed',
                    description: error.message || 'Invalid email or password',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Success!',
                    description: 'Logged in successfully',
                });

                // Check if admin is logging in
                const isLoggingInAsAdmin = isAdminCredentials(formData.email, formData.password);

                // Redirect to admin dashboard if admin, otherwise home/redirect
                setTimeout(() => {
                    if (isLoggingInAsAdmin) {
                        setLocation('/admin');
                    } else {
                        // Check for redirect param
                        const params = new URLSearchParams(window.location.search);
                        const redirectTo = params.get('redirect');
                        setLocation(redirectTo || '/');
                    }
                }, 1000);
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

            <div className="w-full max-w-md relative z-10">
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
                        India's Export Partner
                    </p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-slate-900 border border-[#C05800]/20 shadow-2xl p-10 md:p-12"
                >
                    <div className="mb-8">
                        <h2 className="font-luxury-heading text-3xl md:text-4xl italic text-slate-900 dark:text-white mb-3">
                            Welcome Back
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Sign in to your Panora Exports account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2 group">
                            <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium group-focus-within:text-[#C05800] transition-colors">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#C05800] transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-8 pr-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white"
                                    placeholder="buyer@company.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2 group">
                            <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium group-focus-within:text-[#C05800] transition-colors">
                                Password
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

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 border border-slate-300 dark:border-slate-600 rounded accent-[#C05800]"
                                />
                                <span className="text-slate-600 dark:text-slate-400 group-hover:text-[#C05800] transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <a
                                href="/auth/forgot-password"
                                className="text-[#C05800] hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#C05800] text-white py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#c19b2f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">
                                New to Panora Exports?
                            </span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <a
                        href="/auth/register"
                        className="block w-full text-center border border-[#C05800] text-[#C05800] py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#C05800] hover:text-white transition-all duration-300"
                    >
                        Create Account
                    </a>
                </motion.div>

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
