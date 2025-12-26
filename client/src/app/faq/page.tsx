import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
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
        <div className="min-h-screen bg-[#FDFBD4] dark:bg-[#38240D] pt-20">
            <Navigation />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-24 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="absolute inset-0 bg-[#FDFBD4]/50 dark:bg-[#38240D]/50 -z-10" />
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C05800]/10 text-[#C05800] text-xs font-medium uppercase tracking-wider mb-6"
                    >
                        <HelpCircle className="w-4 h-4" />
                        Help Center
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-luxury-heading"
                    >
                        Frequently Asked <span className="text-[#C05800] italic">Questions</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 dark:text-slate-400 text-lg"
                    >
                        Everything you need to know about sourcing with Panora Exports
                    </motion.p>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="max-w-3xl mx-auto px-6 py-16">
                <div className="space-y-12">
                    {faqs.map((section, sIndex) => (
                        <div key={section.category}>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-[#C05800]" />
                                {section.category}
                            </h3>
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
                                            transition={{ delay: qIndex * 0.1 }}
                                            className="group bg-white dark:bg-[#38240D] border border-slate-200 dark:border-[#C05800]/20 rounded-lg overflow-hidden hover:border-[#C05800]/30 transition-colors"
                                        >
                                            <button
                                                onClick={() => toggleAccordion(id)}
                                                className="w-full flex items-center justify-between p-6 text-left"
                                            >
                                                <span className={`font-medium text-lg transition-colors ${isOpen ? 'text-[#C05800]' : 'text-slate-900 dark:text-white'}`}>
                                                    {item.q}
                                                </span>
                                                <span className={`flex-shrink-0 ml-4 p-1 rounded-full border transition-all duration-300 ${isOpen ? 'rotate-180 border-[#C05800] text-[#C05800]' : 'border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                                                    <ChevronDown className="w-5 h-5" />
                                                </span>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
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
            <section className="bg-[#38240D] dark:bg-[#38240D]/80 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Still have questions?</h2>
                    <p className="text-slate-400 mb-8">Can't find the answer you're looking for? Please write to our support team.</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#C05800] text-white hover:bg-[#b09130] transition-colors rounded-sm font-medium uppercase tracking-wider"
                    >
                        <Mail className="w-5 h-5" />
                        Contact Support
                    </a>
                </div>
            </section>
        </div>
    );
}
