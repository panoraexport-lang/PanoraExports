import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { useLocation, Link } from 'wouter';
import { ChevronDown, Plus, Minus, HelpCircle, Mail } from 'lucide-react';

const faqs = [
    {
        category: 'Ordering & Payment',
        questions: [
            {
                q: "What payment methods do you accept?",
                a: "We accept variety of secure payment methods including Letter of Credit (LC), T/T (Bank Transfer), and major credit cards for sample orders. All transactions are securely processed and verified."
            },
            {
                q: "Is there a minimum order quantity (MOQ)?",
                a: "Yes, MOQs vary by product and supplier. Generally, for B2B export orders, we have reasonable minimums to ensure cost-effectiveness in shipping. Specific MOQs are listed on each product page."
            },
            {
                q: "Can I request a sample before a bulk order?",
                a: "Absolutely. We encourage sampling to ensure quality meets your standards. You can request samples directly through the product page or by contacting our team. Sample costs and shipping fees may apply."
            }
        ]
    },
    {
        category: 'Shipping & Logistics',
        questions: [
            {
                q: "Do you ship internationally?",
                a: "Yes, Panora Exports specializes in global trade. We ship to over 50 countries including USA, UK, UAE, Australia, and Canada, handling all export documentation."
            },
            {
                q: "How are shipping costs calculated?",
                a: "Shipping costs depend on weight, volume, destination, and mode of transport (Air vs Sea). We provide transparent quotes including FOB (Free on Board) or CIF (Cost, Insurance, and Freight) pricing upon request."
            },
            {
                q: "How long does shipping take?",
                a: "Air freight typically takes 5-7 business days, while sea freight can take 20-45 days depending on the destination. We provide tracking details once the shipment is dispatched."
            }
        ]
    },
    {
        category: 'Verification & Quality',
        questions: [
            {
                q: "Are the suppliers verified?",
                a: "Yes, 100% of our suppliers undergo a rigorous verification process including business registration checks, factory visits, and quality audits before listing on Panora Exports."
            },
            {
                q: "What if the product quality doesn't match?",
                a: "We have a strict quality assurance policy. If products received differ significantly from the agreed specifications or samples, our specialized dispute resolution team will assist in securing a refund or replacement."
            }
        ]
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-background pt-20 font-sans antialiased text-primary">
            <Navigation />

            {/* Hero Section */}
            <section className="py-20 bg-background">
                <div className="max-w-4xl mx-auto px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-primary text-[9px] font-bold uppercase tracking-widest mb-8 border border-border rounded-sm"
                    >
                        <HelpCircle className="w-3.5 h-3.5" />
                        Help Center
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-primary mb-6 tracking-tight"
                    >
                        Frequently Asked <br />
                        <span className="font-serif italic font-light opacity-80">Questions.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-primary/60 text-lg font-medium max-w-xl mx-auto"
                    >
                        Find answers to common questions about sourcing, logistics, and verification.
                    </motion.p>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="max-w-4xl mx-auto px-8 py-12 pb-32">
                <div className="space-y-16">
                    {faqs.map((section, sIndex) => (
                        <div key={section.category}>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-[1.5px] bg-primary" />
                                <h3 className="text-[9px] font-bold text-primary uppercase tracking-widest">
                                    {section.category}
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {section.questions.map((item, qIndex) => {
                                    const id = `${sIndex}-${qIndex}`;
                                    const isOpen = openIndex === id;

                                    return (
                                        <motion.div
                                            key={qIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="bg-background border border-border rounded-sm overflow-hidden transition-all shadow-sm"
                                        >
                                            <button
                                                onClick={() => toggleAccordion(id)}
                                                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                                            >
                                                <span className={`font-bold text-lg md:text-xl tracking-tight transition-colors ${isOpen ? 'text-primary' : 'text-primary'}`}>
                                                    {item.q}
                                                </span>
                                                <ChevronDown className={`w-4 h-4 text-primary/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <div className="px-6 md:px-8 pb-8 text-primary/60 text-[15px] font-medium leading-relaxed border-t border-border pt-6">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="bg-primary py-20 px-8 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 tracking-tight">Need more help?</h2>
                    <p className="text-primary-foreground/80 mb-10 text-lg font-medium">Our export specialists are ready to assist with your specific requirements.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-primary-foreground text-primary hover:opacity-90 transition-all rounded-sm font-bold text-[10px] uppercase tracking-widest"
                    >
                        <Mail className="w-3.5 h-3.5" />
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    );
}
