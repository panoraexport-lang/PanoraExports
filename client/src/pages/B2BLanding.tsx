import { motion, useInView } from "framer-motion";
import { CheckCircle, Package, Leaf, TrendingUp, Globe, Shield, FileCheck, DollarSign, MessageCircle, Mail, MapPin } from "lucide-react";
import { useRef } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

// Simple grain texture component
const Grain = () => (
    <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-[9999] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
    />
);

// Animated section wrapper
const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.section>
    );
};

export default function B2BLanding() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans antialiased">
            <Grain />
            <Navigation />

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/hero-plane.png')] bg-cover bg-center opacity-20 blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight tracking-tight">
                            Trusted Indian Exporter of<br />Textiles & Agro Commodities
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-12 font-light tracking-wide">
                            Sourcing. Quality. Global Delivery.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/contact">
                                <button className="px-10 py-4 bg-primary text-primary-foreground rounded-md text-base font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    Request Product Catalogue
                                </button>
                            </Link>
                            <a href="https://wa.me/919005230333?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20I%20would%20like%20to%20know%20more." target="_blank" rel="noopener noreferrer">
                                <button className="px-10 py-4 bg-white text-primary rounded-md text-base font-medium hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    WhatsApp Us
                                </button>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/60 to-white/0" />
                </motion.div>
            </section>

            {/* WHAT WE EXPORT */}
            <Section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-4">
                            What We Export
                        </h2>
                        <div className="w-20 h-1 bg-accent mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Package,
                                title: "Textiles & Towels",
                                desc: "Premium quality cotton textiles, industrial fabrics, and luxury bath linens sourced from India's finest mills."
                            },
                            {
                                icon: Leaf,
                                title: "Agro Commodities",
                                desc: "High-grade Basmati rice, spices, and organic produce processed with international safety standards."
                            },
                            {
                                icon: TrendingUp,
                                title: "Custom Sourcing",
                                desc: "Dedicated merchant export services providing tailored sourcing solutions for unique international requirements."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="bg-white p-10 rounded-none border-t-2 border-accent hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-16 h-16 bg-muted flex items-center justify-center mb-6">
                                    <item.icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* WHY PANORA EXPORTS */}
            <Section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Image */}
                        <div className="relative">
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary to-primary/90 rounded-xl overflow-hidden">
                                <img
                                    src="/hero-plane.png"
                                    alt="Warehouse"
                                    className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 max-w-xs">
                                <p className="text-sm italic leading-relaxed">
                                    "Reliability is our core promise to every international buyer."
                                </p>
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div>
                            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-8">
                                Why Panora Exports
                            </h2>
                            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                                We bridge the gap between Indian craftsmanship and global quality standards, ensuring every transaction is built on trust and transparency.
                            </p>

                            <div className="space-y-5">
                                {[
                                    "Verified Indian Manufacturers",
                                    "Export-ready Packaging",
                                    "Trial Orders Accepted",
                                    "Transparent Pricing",
                                    "FOB / CIF / DDP Options"
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-lg text-foreground">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* PRODUCT PREVIEW */}
            <Section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-2">
                                Product Preview
                            </h2>
                            <div className="w-20 h-1 bg-accent" />
                        </div>
                        <Link href="/products">
                            <button className="text-primary font-medium hover:underline underline-offset-4">
                                View Full Catalogue →
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { title: "Premium Towels", img: "https://images.unsplash.com/photo-1617811449482-31093c8cee16?q=80&w=735&auto=format&fit=crop" },
                            { title: "Authentic Spices", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop" },
                            { title: "Pashmina Shawls", img: "https://images.unsplash.com/photo-1542060748-10c28722263d?w=1200&h=800&fit=crop&q=90" },
                            { title: "Rice / Agro", img: "https://plus.unsplash.com/premium_photo-1674624682288-085eff4f98da?q=80&w=687&auto=format&fit=crop" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="aspect-square bg-white overflow-hidden group cursor-pointer"
                            >
                                <div className="relative w-full h-full">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <h3 className="text-white font-medium text-lg">{item.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* TRUST & CREDENTIALS */}
            <Section className="py-24 px-6 bg-primary text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-12">
                        Trust & Credentials
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="flex items-center gap-4 justify-center">
                            <Shield className="w-8 h-8" strokeWidth={1.5} />
                            <span className="text-lg">GST Registered</span>
                        </div>
                        <div className="flex items-center gap-4 justify-center">
                            <FileCheck className="w-8 h-8" strokeWidth={1.5} />
                            <span className="text-lg">IEC Certified</span>
                        </div>
                        <div className="flex items-center gap-4 justify-center">
                            <Globe className="w-8 h-8" strokeWidth={1.5} />
                            <span className="text-lg">Countries Served: UAE, UK, EU</span>
                        </div>
                        <div className="flex items-center gap-4 justify-center">
                            <MapPin className="w-8 h-8" strokeWidth={1.5} />
                            <span className="text-lg">Based in India | Serving Global Buyers</span>
                        </div>
                    </div>

                    <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                        Our commitment to quality and compliance ensures seamless international trade partnerships built on trust and transparency.
                    </p>
                </div>
            </Section>

            {/* CONTACT CTA */}
            <Section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-6">
                        Looking for a reliable sourcing partner in India?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Connect with us today to discuss your export requirements and discover how we can support your global sourcing needs.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a href="https://wa.me/919005230333?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20I%20would%20like%20to%20know%20more." target="_blank" rel="noopener noreferrer">
                            <button className="px-10 py-4 bg-[#25D366] text-white rounded-md text-base font-medium hover:bg-[#20bd5a] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3">
                                <MessageCircle className="w-5 h-5" />
                                WhatsApp: +91 9005230333
                            </button>
                        </a>
                        <a href="mailto:info@panoraexport.com">
                            <button className="px-10 py-4 bg-white border-2 border-primary text-primary rounded-md text-base font-medium hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-3">
                                <Mail className="w-5 h-5" />
                                info@panoraexport.com
                            </button>
                        </a>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                        <span>106, Tulip C, SEC-11, 819/3, Indra Nagar, Lucknow, UP 226016</span>
                    </div>
                </div>
            </Section>

            {/* FOOTER */}
            <footer className="bg-primary text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-2">
                            <h3 className="font-heading text-3xl font-bold mb-4">PANORA EXPORTS</h3>
                            <p className="text-white/70 leading-relaxed max-w-md">
                                India's premier B2B export platform. Connecting verified buyers with authentic Indian products across Textiles, Agriculture, and more.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                            <ul className="space-y-3 text-white/70">
                                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                                <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                                <li><Link href="/verification" className="hover:text-white transition-colors">Verification</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
                            <ul className="space-y-3 text-white/70">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Export Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
                        <p>© 2025 Panora Exports. All rights reserved.</p>
                        <p className="mt-4 md:mt-0">Designed for global B2B excellence</p>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/919005230333?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20I%20would%20like%20to%20know%20more."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 z-50"
            >
                <MessageCircle className="w-8 h-8 text-white" />
            </a>
        </div>
    );
}
