import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { SecureDocument } from "@/components/SecureDocument";
import { ScreenshotProtection } from '@/components/ScreenshotProtection';
import { Shield, FileCheck, Globe, Package } from 'lucide-react';

export default function LicensesPage() {
    return (
        <ScreenshotProtection>
            <div className="min-h-screen bg-[#05070a] pt-32 font-sans antialiased text-white">
                <Navigation />

                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-24"
                    >
                        <div className="flex items-center gap-3 mb-8 justify-center">
                            <div className="w-8 h-[1px] bg-secondary" />
                            <h2 className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em]">Secure Vault</h2>
                            <div className="w-8 h-[1px] bg-secondary" />
                        </div>

                        <h3 className="text-5xl md:text-8xl font-black text-white mb-10 leading-[0.95] tracking-tighter uppercase">
                            Official <br />
                            <span className="font-serif italic font-light text-secondary lowercase">Certifications.</span>
                        </h3>

                        <p className="text-lg text-white/40 leading-relaxed font-medium max-w-xl mx-auto">
                            Accessing our verified institutional credentials. These documents are protected under Level 4 security protocols.
                        </p>
                    </motion.div>

                    <div className="space-y-20 mb-32">
                        <div className="flex items-center gap-6">
                            <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] whitespace-nowrap">Verified Documents</h4>
                            <div className="h-px flex-1 bg-gradient-to-r from-secondary/30 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="relative group">
                                <div className="absolute -inset-10 bg-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                                <SecureDocument src="/licenses/fssai-license.png" alt="FSSAI License" />
                                <p className="mt-4 text-center text-[10px] font-black uppercase tracking-widest text-white/40">FSSAI Central License</p>
                            </div>
                            <div className="relative group">
                                <div className="absolute -inset-10 bg-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                                <SecureDocument src="/licenses/iec-certificate.png" alt="IEC Certificate" watermarkText="IEC REGISTRATION - PANORA EXPORTS" />
                                <p className="mt-4 text-center text-[10px] font-black uppercase tracking-widest text-white/40">Import Export Code</p>
                            </div>
                            <div className="relative group">
                                <div className="absolute -inset-10 bg-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                                <SecureDocument src="/licenses/udyam-registration.png" alt="Udyam Registration" watermarkText="UDYAM REGISTRATION - PANORA EXPORTS" />
                                <p className="mt-4 text-center text-[10px] font-black uppercase tracking-widest text-white/40">Udyam MSME Certificate</p>
                            </div>
                            <div className="relative group">
                                <div className="absolute -inset-10 bg-secondary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                                <SecureDocument src="/licenses/rcmc-certificate.png" alt="RCMC Certificate" watermarkText="RCMC REGISTRATION - PANORA EXPORTS" />
                                <p className="mt-4 text-center text-[10px] font-black uppercase tracking-widest text-white/40">RCMC Membership</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-12 text-white/10 pt-16 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <Shield className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Confidential</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Protected</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FileCheck className="w-4 h-4" />
                                <span className="text-[9px] font-black uppercase tracking-[0.5em]">Authorized Only</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScreenshotProtection>
    );
}
