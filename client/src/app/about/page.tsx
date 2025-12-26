'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Shield, Award, Briefcase, CheckCircle, FileCheck, Globe, Building2, User } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FDFBD4] dark:bg-slate-950 pt-20 font-sans selection:bg-[#C05800] selection:text-white">
            <Navigation />

            {/* Hero Section - Minimalist & Impactful */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/50 -z-10" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C05800]/5 skew-x-12 translate-x-20" />

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <span className="text-[#C05800] text-xs font-bold tracking-[0.4em] uppercase block mb-6">
                            Our Essence
                        </span>
                        <h1 className="font-luxury-heading text-5xl md:text-7xl text-slate-900 dark:text-white mb-8 italic leading-tight">
                            Curating Trust in <br />
                            <span className="text-slate-400 dark:text-slate-600 not-italic">Global Trade.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light max-w-2xl border-l-2 border-[#C05800] pl-6">
                            Panora Exports isn't just a platform; it's a commitment to authenticity. We bridge the gap between India's finest artisans and the world's most discerning buyers through a lens of uncompromised quality.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Trust & Psychology Section */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Shield,
                                title: "Unwavering Integrity",
                                desc: "In an industry clouded by uncertainty, we stand as a beacon of transparency. Every supplier is vetted, every product verified."
                            },
                            {
                                icon: Award,
                                title: "Curated Excellence",
                                desc: "We don't chase volume; we pursue value. Our catalog is a handpicked collection of India's premium export capabilities."
                            },
                            {
                                icon: Globe,
                                title: "Borderless Vision",
                                desc: "We understand the psychology of global business—reliability, speed, and precision are the universal languages we speak."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                className="group p-8 border border-slate-100 dark:border-slate-800 hover:border-[#C05800]/30 hover:bg-[#FDFBD4] dark:hover:bg-slate-800/50 transition-all duration-500"
                            >
                                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white mb-6 group-hover:text-[#C05800] transition-colors">
                                    <item.icon strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-[#C05800] transition-colors">{item.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-loose text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section - Single Member */}
            <section className="py-32 bg-[#38240D] text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <div className="w-20 h-1 bg-[#C05800] mx-auto mb-12" />
                    <h2 className="font-luxury-heading text-4xl md:text-5xl italic mb-12">The Leadership</h2>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-12 md:p-16 max-w-2xl mx-auto hover:border-[#C05800]/50 transition-colors duration-500">
                        <div className="w-24 h-24 mx-auto bg-[#C05800]/20 rounded-full flex items-center justify-center mb-8 border border-[#C05800]">
                            <span className="font-luxury-heading text-4xl italic text-[#C05800]">R</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 tracking-wide">Rishabh</h3>
                        <p className="text-[#C05800] text-xs uppercase tracking-[0.3em] mb-8">Founder & Visionary</p>
                        <p className="text-slate-300 leading-relaxed font-light italic text-lg">
                            "True luxury in trade lies in the peace of mind. At Panora Exports, we are not just moving goods; we are upholding a legacy of Indian craftsmanship and delivering promises globally."
                        </p>
                    </div>
                </div>
            </section>

            {/* Certifications & Authenticity */}
            <section className="py-32 bg-[#FDFBD4] dark:bg-slate-950">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <span className="text-[#C05800] text-xs font-bold tracking-[0.4em] uppercase block mb-4">Authenticity</span>
                            <h2 className="font-luxury-heading text-4xl md:text-5xl text-slate-900 dark:text-white italic">Verified & Certified</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md text-right mt-6 md:mt-0">
                            Our commitment to compliance is absolute. We hold all necessary certifications to ensure frictionless global trade.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Import Export Code", sub: "Govt. of India", icon: FileCheck },
                            { name: "GST Registered", sub: "Tax Compliance", icon: Building2 },
                            { name: "FIEO Member", sub: "Export Federation", icon: Globe },
                            { name: "ISO 9001:2015", sub: "Quality Management", icon: CheckCircle },
                        ].map((cert, i) => (
                            <div key={i} className="aspect-[4/3] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-6 text-center hover:shadow-2xl hover:shadow-[#C05800]/5 transition-all duration-500 group">
                                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <cert.icon className="w-8 h-8 text-slate-400 group-hover:text-[#C05800] transition-colors" strokeWidth={1} />
                                </div>
                                <div className="h-px w-8 bg-slate-200 dark:bg-slate-700 mb-4 group-hover:bg-[#C05800] transition-colors" />
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-1">{cert.name}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{cert.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
