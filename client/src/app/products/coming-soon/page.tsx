import { motion } from 'framer-motion';
import { Package, Sparkles, Bell, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ProductsComingSoon() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { toast } = useToast();

    const isBusinessEmail = (email: string) => {
        const publicDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'icloud.com', 'aol.com', 'zoho.com', 'protonmail.com',
            'mail.com', 'yandex.com', 'live.com'
        ];
        const domain = email.split('@')[1]?.toLowerCase();
        return domain && !publicDomains.includes(domain);
    };

    const handleNotifyMe = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast({
                title: "Email Required",
                description: "Please enter your email address",
                variant: "destructive"
            });
            return;
        }

        if (!isBusinessEmail(email)) {
            toast({
                title: "Business Email Required",
                description: "Please provide a professional business email address.",
                variant: "destructive"
            });
            return;
        }

        // Simulate subscription
        setIsSubscribed(true);
        toast({
            title: "Success!",
            description: "You'll be notified when this product becomes available",
        });
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 relative overflow-hidden">
            <Navigation />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Icon */}
                    <motion.div
                        className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl shadow-2xl shadow-purple-500/20"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Package className="w-12 h-12 text-white" />
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-300">Coming Soon</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                    >
                        Something Amazing
                        <br />
                        Is On The Way
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        We're crafting an exceptional product experience for you.
                        Be the first to know when it launches and get exclusive early access.
                    </motion.p>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
                    >
                        {[
                            { icon: CheckCircle2, text: "Premium Quality Products" },
                            { icon: CheckCircle2, text: "Verified Suppliers" },
                            { icon: CheckCircle2, text: "Competitive Pricing" }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
                            >
                                <feature.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span className="text-sm text-slate-300">{feature.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Notify Me Form */}
                    {!isSubscribed ? (
                        <motion.form
                            onSubmit={handleNotifyMe}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="max-w-md mx-auto"
                        >
                            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                                <div className="relative flex-1">
                                    <Bell className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="business@company.com"
                                        className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center justify-center gap-2"
                                >
                                    Notify Me
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-3">
                                We'll notify you when this product is available. No spam, promise! 🎉
                            </p>
                        </motion.form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-md mx-auto p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl"
                        >
                            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                            <h3 className="text-xl font-semibold text-white mb-2">You're All Set!</h3>
                            <p className="text-slate-400">
                                We'll send you an email as soon as this product is available.
                            </p>
                        </motion.div>
                    )}

                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-12"
                    >
                        <a
                            href="/products"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowRight className="w-4 h-4 rotate-180" />
                            <span>Browse Available Products</span>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
