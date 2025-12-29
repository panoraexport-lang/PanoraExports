import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  Mail,
  MapPin,
  Package,
  Leaf,
  Search,
  FileCheck,
  Shield,
  Globe,
  ArrowRight,
  TrendingUp,
  Box
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

// Assets
import containerShip from "@assets/stock_images/luxury_container_shi_990cf15c.jpg";
import logisticsImage from "@assets/stock_images/modern_automated_log_e4071bac.jpg";
import heroImage from "/hero-plane.png";

// --- Components ---

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
);

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 md:py-24 px-6 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const ExportCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-card p-12 flex flex-col items-center text-center transition-all duration-500 border border-primary/5 hover:border-primary/20 shadow-sm relative group overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.02] -mr-8 -mt-8 rounded-full group-hover:bg-primary/[0.05] transition-all" />
    <div className="mb-10 p-5 rounded-sm bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
      <Icon strokeWidth={1} className="w-10 h-10" />
    </div>
    <h3 className="text-xl font-black mb-6 text-foreground uppercase tracking-tight">{title}</h3>
    <p className="text-muted-foreground leading-relaxed font-medium text-sm">{desc}</p>
  </div>
);

export default function LuxuryLanding() {
  return (
    <div className="font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground antialiased">
      <Grain />
      <Navigation />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Hero Background"
            className="w-full h-full object-cover scale-[1.01] brightness-[1.02]"
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 bg-primary/5 text-primary border border-primary/10 rounded-sm">
              <Globe className="w-3.5 h-3.5 opacity-70" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Verified Export Partner</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-[1.1] tracking-tight">
              Quality <br />
              <span className="font-serif italic font-light opacity-80">Exports</span> Simplified.
            </h1>

            <p className="text-lg md:text-xl text-primary opacity-70 mb-12 font-medium max-w-lg leading-relaxed">
              Leading sourcing and logistics partner for Indian textiles, agro-commodities, and industrial goods for international markets.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-background text-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-green-600 hover:border-radius-[80px] hover:text-white transition-all border border-border flex items-center justify-center gap-2 "
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>

            {/* Bottom Metrics */}
            <div className="mt-16 flex items-center gap-12 border-t border-border pt-8">
              <div>
                <div className="text-2xl font-bold text-primary tracking-tight">100%</div>
                <div className="text-[9px] uppercase tracking-[0.1em] font-bold text-muted-foreground mt-1">Quality Goods</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary tracking-tight">Global</div>
                <div className="text-[9px] uppercase tracking-[0.1em] font-bold text-muted-foreground mt-1">Logistics Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT WE EXPORT */}
      <Section id="export-categories" className="bg-background">
        <div className="grid md:grid-cols-3 gap-6">
          <ExportCard
            icon={Package}
            title="Textiles"
            desc="Premium cotton textiles and high-quality towels from certified Indian mills."
          />
          <ExportCard
            icon={Leaf}
            title="Agro Goods"
            desc="Global export of Basmati rice and premium spices with strict quality control."
          />
          <ExportCard
            icon={Search}
            title="Sourcing"
            desc="Dedicated merchant export services tailored to your specific product needs."
          />
        </div>
      </Section>

      {/* 3. WHY PANORA EXPORTS */}
      <Section className="bg-background py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-[1.5px] bg-primary" />
              <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Our Values</h2>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-10 leading-tight tracking-tight">
              Building <span className="font-serif italic font-light opacity-80 text-primary">Global</span> Trust.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Quality Supply",
                "Export Packaging",
                "Trial Shipments",
                "Volume Pricing",
                "Global Logistics",
                "Ethical Sourcing"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <CheckCircle2 strokeWidth={2} className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-base text-primary/70 font-medium tracking-tight group-hover:text-primary transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-sm grayscale-[0.5] contrast-110">
              <img src="https://images.unsplash.com/photo-1609143739217-01b60dad1c67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Global Logistics" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 border-[16px] border-background/40 pointer-events-none" />
          </div>
        </div>
      </Section>

      {/* 4. PRODUCT PREVIEW */}
      <Section id="products" className="bg-secondary/30 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-[1.5px] bg-primary" />
              <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Our Collection</h2>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">Browse <span className="font-serif italic font-light opacity-80">Products.</span></h3>
          </div>
          <Link href="/products" className="group text-primary font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all border-b border-border pb-1.5">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Cotton Textiles", img: "https://plus.unsplash.com/premium_photo-1673125287363-b4e837f1215f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { title: "Towels & Fabrics", img: "https://images.unsplash.com/photo-1617811449482-31093c8cee16?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { title: "Agro Commodities", img: "https://plus.unsplash.com/premium_photo-1674624682288-085eff4f98da?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            { title: "Industrial Goods", img: "https://images.unsplash.com/photo-1623610590744-fce60d8dd48c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
          ].map((item, i) => (
            <Link key={i} href="/products" className="group block">
              <div className="aspect-[1/1] overflow-hidden bg-card mb-4 border border-border">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider text-center group-hover:text-primary transition-colors">{item.title}</h3>
            </Link>
          ))}
        </div>
      </Section>

      {/* 5. TRUST & CREDENTIALS */}
      <Section className="bg-background border-y border-border py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-16">
            <div className="w-10 h-[1px] bg-border" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Our Certifications</span>
            <div className="w-10 h-[1px] bg-border" />
          </div>

          <div className="flex flex-wrap justify-center gap-x-16 gap-y-10 mb-16">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 bg-secondary rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Shield strokeWidth={1} className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase tracking-[0.1em] text-[9px] text-primary/60">GST Verified</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 bg-secondary rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <FileCheck strokeWidth={1} className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase tracking-[0.1em] text-[9px] text-primary/60">IEC Certified</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-14 h-14 bg-secondary rounded-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Globe strokeWidth={1} className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase tracking-[0.1em] text-[9px] text-primary/60">Global Markets</span>
            </div>
          </div>
          <p className="text-lg text-primary/70 leading-relaxed max-w-2xl mx-auto font-medium font-serif italic">
            Serving buyers across UAE, UK, and Europe with high-capacity sourcing and ethical trade standards.
          </p>
        </div>
      </Section>

      {/* 6. CONTACT CTA */}
      <Section className="bg-primary text-primary-foreground py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
            Start Your Export <span className="font-serif italic font-light opacity-60">Journey.</span>
          </h2>
          <p className="text-lg text-primary-foreground/70 mb-16 font-medium max-w-2xl mx-auto leading-relaxed">
            Connect with our team for bulk inquiries and specialized sourcing requirements.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <a
              href="https://wa.me/919876543210"
              className="flex flex-col items-center p-10 bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm hover:bg-primary-foreground/10 transition-all group"
            >
              <MessageCircle className="w-10 h-12 mb-4 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors" strokeWidth={1} />
              <span className="text-[9px] uppercase tracking-[0.3em] text-primary-foreground/40 mb-3 font-bold">WhatsApp</span>
              <span className="text-xl font-bold tracking-tight text-primary-foreground">+91 (Export Line)</span>
            </a>
            <a
              href="mailto:panoraexports@gmail.com"
              className="flex flex-col items-center p-10 bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm hover:bg-primary-foreground/10 transition-all group"
            >
              <Mail className="w-10 h-12 mb-4 text-primary-foreground/60 group-hover:text-primary-foreground transition-colors" strokeWidth={1} />
              <span className="text-[9px] uppercase tracking-[0.3em] text-primary-foreground/40 mb-3 font-bold">Email</span>
              <span className="text-xl font-bold tracking-tight text-primary-foreground">export@panora.global</span>
            </a>
          </div>

          <div className="inline-flex items-center gap-3 text-primary-foreground/30 text-[9px] uppercase font-bold tracking-[0.4em]">
            <MapPin className="w-3.5 h-3.5" />
            Mumbai, India
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 bg-background border-t border-border px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <Link href="/" className="flex flex-col items-center md:items-start group">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-xl tracking-tight text-primary">
                PANORA
              </span>
              <span className="font-serif italic text-primary text-lg font-light">
                exports
              </span>
            </div>
            <span className="text-[8px] text-muted-foreground uppercase tracking-[0.3em] font-bold mt-2">
              Global Exports
            </span>
          </Link>

          <div className="text-muted-foreground/50 text-[9px] uppercase font-bold tracking-[0.2em] order-3 md:order-2">
            © 2025 Panora Exports.
          </div>

          <div className="flex gap-10 order-2 md:order-3">
            {[
              { label: 'Products', href: '/products' },
              { label: 'About', href: '/about' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Contact', href: '/contact' }
            ].map((link, i) => (
              <Link key={i} href={link.href} className="text-[9px] uppercase tracking-[0.1em] font-bold text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-500 z-50 group border border-border"
      >
        <MessageCircle className="w-8 h-8" strokeWidth={1} />
        <span className="absolute right-full mr-6 bg-background text-primary py-3 px-6 rounded-sm shadow-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-primary/10">
          Initialize WhatsApp Secure Channel
        </span>
      </a>
    </div>
  );
}
