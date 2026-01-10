'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { SecureDocument } from "@/components/SecureDocument";
import { Shield, Award, Briefcase, CheckCircle, FileCheck, Globe, Building2, User, Package, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-20 font-sans antialiased text-primary">
            <Navigation />

            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden bg-background">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-[1.5px] w-8 bg-secondary" />
                            <span className="text-secondary text-[9px] font-bold tracking-[0.3em] uppercase">Corporate Profile</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 leading-[1.1] tracking-tight">
                            Institutional <br />
                            <span className="font-serif italic font-light text-secondary">Trade Compliance.</span>
                        </h1>
                        <p className="text-lg text-primary/80 leading-relaxed font-medium max-w-xl mb-12">
                            Panora Exports operates at the intersection of precision logistics and global trade integrity. We specialize in scaling high-volume Indian production for the MENA and European corridors, ensuring rigorous adherence to international enterprise standards.
                        </p>
                        <Link href="/products">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.3em] rounded-sm hover:opacity-90 transition-all flex items-center gap-4 group"
                            >
                                View Product Directory
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-20 bg-secondary/30">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Integrity",
                                desc: "Transparency is at the core of our operations. Every supplier is thoroughly vetted to ensure compliance and ethical sourcing."
                            },
                            {
                                icon: Award,
                                title: "Quality Control",
                                desc: "We maintain strict quality benchmarks. Our catalogue represents the finest export capabilities from across the subcontinent."
                            },
                            {
                                icon: Globe,
                                title: "Market Expertise",
                                desc: "With a deep understanding of international logistics, we provide seamless trade solutions tailored to global requirements."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="p-8 bg-background border border-secondary/20 hover:border-secondary transition-all rounded-sm"
                            >
                                <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center text-secondary mb-6 transition-all rounded-sm border border-secondary/20">
                                    <item.icon strokeWidth={1.5} className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-primary mb-3 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-primary/60 leading-relaxed text-[13px] font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-serif italic mb-10 font-light text-secondary">Our Commitment</h2>
                    <div className="space-y-8">
                        <div className="w-12 h-[1px] bg-secondary/30 mx-auto" />
                        <p className="text-white/90 leading-relaxed font-serif italic text-xl md:text-2xl">
                            "Our mandate is to formalize global procurement protocols. We believe architectural trade is founded on the precision of fulfillment and the unwavering consistency of verified quality."
                        </p>
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center mb-4 border border-primary-foreground/20">
                                <User className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xs font-bold tracking-[0.2em] uppercase">Founder Statement</h3>
                            <p className="text-primary-foreground/40 text-[9px] uppercase tracking-widest mt-1">Panora Exports</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section className="py-32 bg-[#05070a] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    {/* Top Level Heading Section */}
                    <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-[1px] bg-secondary" />
                                <h2 className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em]">Compliance Core</h2>
                            </div>

                            <h3 className="text-5xl md:text-8xl font-black text-white mb-10 leading-[0.95] tracking-tighter uppercase">
                                Verified <br />
                                <span className="font-serif italic font-light text-secondary lowercase">& authorized.</span>
                            </h3>

                            <p className="text-lg text-white/50 leading-relaxed font-medium max-w-xl mb-10">
                                Our operational framework is built on a foundation of rigorous government certifications and international trade compliance, ensuring every export meets global safety benchmarks.
                            </p>

                            <Link href="/licenses">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-5 bg-secondary text-black text-[12px] font-black uppercase tracking-[0.3em] rounded-sm hover:shadow-[0_0_40px_rgba(234,179,8,0.2)] transition-all flex items-center gap-4 group"
                                >
                                    See Official Licenses
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Import Export Code", desc: "DGFT - GOVT. OF INDIA", icon: Package },
                                { title: "GST Registered", desc: "TAX & LEGAL ENTITY", icon: Shield },
                                { title: "FIEO Member", desc: "FEDERATION OF EXPORT ORG.", icon: Globe },
                                { title: "FSSAI Licensed", desc: "FOOD SAFETY AUTHORITY", icon: FileCheck },
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 bg-white/[0.02] border border-white/10 rounded-[4px] flex items-center gap-5 group hover:bg-white/[0.05] transition-all">
                                    <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                        <item.icon className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-black text-white uppercase tracking-wider mb-1 mt-1">{item.title}</h4>
                                        <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-12 text-white/10 pt-16 border-t border-white/5">
                        <span className="text-[9px] font-black uppercase tracking-[0.5em]">Confidential Access</span>
                        <div className="h-px w-12 bg-white/10" />
                        <span className="text-[9px] font-black uppercase tracking-[0.5em]">Digitally Protected</span>
                        <div className="h-px w-12 bg-white/10" />
                        <span className="text-[9px] font-black uppercase tracking-[0.5em]">Institutional Merit</span>
                    </div>
                </div>
            </section>

            {/* Registered Office Section */}
            <section className="py-24 bg-background border-t border-border">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <div className="flex flex-col items-center gap-6">
                        <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-full text-secondary mb-2">
                            <Building2 className="w-8 h-8" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h2 className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] mb-6">Registered Office</h2>
                            <p className="text-lg md:text-xl font-medium text-primary/80 leading-relaxed max-w-lg mx-auto uppercase tracking-wide">
                                106, Tulip C, SEC-11, 819/3, Indra Nagar, Lucknow, Lucknow, LUCKNOW, UTTAR PRADESH, 226016
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
