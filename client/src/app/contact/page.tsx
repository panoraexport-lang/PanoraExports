import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Mail, Phone, MapPin, Send, Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

export default function ContactPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Attempt to send via backend API
            // Note: This expects the backend to be running and configured with SMTP
            await apiRequest('POST', '/api/contact', formData);

            toast({
                title: 'Message Sent!',
                description: 'We have received your query and will get back to you shortly.',
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            // Fallback to mailto if backend fails or is not reachable
            console.error('Backend email failed, falling back to mailto', error);

            const subject = encodeURIComponent(`[Panora Contact] ${formData.subject}`);
            const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
            window.location.href = `mailto:panoraexports@gmail.com?subject=${subject}&body=${body}`;

            toast({
                title: 'Opening Email Client',
                description: 'We could not connect to the server, opening your email app instead.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBD4] dark:bg-[#38240D] pt-20">
            <Navigation />

            {/* Hero */}
            <section className="relative py-16 md:py-24 border-b border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
                <div className="absolute inset-0 bg-[#FDFBD4]/50 dark:bg-[#38240D]/50 -z-10" />
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-luxury-heading"
                    >
                        Get in <span className="text-[#C05800] italic">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        Have a question about our products or want to start sourcing? We're here to help around the clock.
                    </motion.p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#C05800]/10 text-[#C05800] rounded-full group-hover:bg-[#C05800] group-hover:text-white transition-colors duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium mb-1">Email Us</p>
                                        <a href="mailto:panoraexports@gmail.com" className="text-lg text-slate-900 dark:text-white font-medium hover:text-[#C05800] transition-colors">
                                            panoraexports@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#C05800]/10 text-[#C05800] rounded-full group-hover:bg-[#C05800] group-hover:text-white transition-colors duration-300">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium mb-1">Call Us</p>
                                        <p className="text-lg text-slate-900 dark:text-white font-medium">
                                            +91 (Support Line)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-[#C05800]/10 text-[#C05800] rounded-full group-hover:bg-[#C05800] group-hover:text-white transition-colors duration-300">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium mb-1">Headquarters</p>
                                        <p className="text-lg text-slate-900 dark:text-white font-medium">
                                            Mumbai, India
                                        </p>
                                        <p className="text-slate-500 dark:text-slate-400">Serving clients globally</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-[#FDFBD4]/50 dark:bg-[#38240D] rounded-lg border border-[#C05800]/20">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Business Hours</h3>
                            <div className="space-y-2 text-slate-600 dark:text-slate-400">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span>9:00 AM - 6:00 PM IST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span>10:00 AM - 4:00 PM IST</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#FDFBD4] dark:bg-[#38240D] border border-[#C05800]/20 p-8 md:p-10 shadow-xl rounded-sm">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white placeholder:text-slate-300"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white placeholder:text-slate-300"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white placeholder:text-slate-300"
                                    placeholder="Product Inquiry"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-medium">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:border-[#C05800] transition-colors text-slate-900 dark:text-white placeholder:text-slate-300 resize-none"
                                    placeholder="Tell us about your requirements..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#C05800] text-white py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#c19b2f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
