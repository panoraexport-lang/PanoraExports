import { motion } from "framer-motion";
import { ReactNode } from "react";
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
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { SecureDocument } from "@/components/SecureDocument";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroImage = "/aeroplane.jpg";

const productsList = [
  { title: "Cotton Textiles", img: "https://plus.unsplash.com/premium_photo-1673125287363-b4e837f1215f?q=80&w=687&auto=format&fit=crop" },
  { title: "Towels & Fabrics", img: "https://images.unsplash.com/photo-1617811449482-31093c8cee16?q=80&w=735&auto=format&fit=crop" },
  { title: "Agro Commodities", img: "https://plus.unsplash.com/premium_photo-1674624682288-085eff4f98da?q=80&w=687&auto=format&fit=crop" },
  { title: "Industrial Goods", img: "https://images.unsplash.com/photo-1623610590744-fce60d8dd48c?q=80&w=687&auto=format&fit=crop" },
  { title: "Organic Spices", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop" },
  { title: "Leather Goods", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=2070&auto=format&fit=crop" },
  { title: "Handicrafts", img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2070&auto=format&fit=crop" },
  { title: "Pashmina Shawls", img: "https://images.unsplash.com/photo-1542060748-10c28722263d?w=1200&h=800&fit=crop&q=90" }
];

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  />
);

const Section = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => (
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
          <motion.img
            src={heroImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover scale-[1.01] brightness-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-10" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-sm">
              <Globe className="w-3.5 h-3.5 opacity-80" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Authorized Global Trade Partner</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-[1.1] tracking-tight">
              Panora Exports: <br />
              <span className="font-serif italic font-light text-secondary">Institutional Excellence</span> in Trade.
            </h1>

            <p className="text-lg md:text-xl text-primary/80 mb-12 font-medium max-w-lg leading-relaxed">
              Standardized supply chain solutions for the Middle-East and Global Markets. Specializing in high-volume Textiles, Agro-Commodities, and Industrial Sourcing.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/products" className="w-full sm:w-auto px-10 py-5 bg-[hsl(var(--success))] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center gap-3 rounded-sm shadow-[0_20px_40px_rgba(22,101,52,0.15)] group">
                Explore Panora's Inventory
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all border border-primary/10 flex items-center justify-center gap-3 rounded-sm group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:scale-125 transition-transform" />
                Institutional Capabilities
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-12 border-t border-secondary/20 pt-8">
              <div>
                <div className="text-2xl font-bold text-secondary tracking-tight">100%</div>
                <div className="text-[9px] uppercase tracking-[0.1em] font-bold text-primary/60 mt-1">QC Standardized</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary tracking-tight">Tier-1</div>
                <div className="text-[9px] uppercase tracking-[0.1em] font-bold text-primary/60 mt-1">Logistics Framework</div>
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
              <div className="w-10 h-[1.5px] bg-secondary" />
              <h2 className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Corporate Standards</h2>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-10 leading-tight tracking-tight">
              Institutional <span className="font-serif italic font-light text-secondary">Integrity</span> & Precision.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Tier-I Quality Assurance",
                "Export-Grade Packaging",
                "Bespoke Trial Shipments",
                "Enterprise Volume Pricing",
                "Optimized Global Logistics",
                "Ethically Audited Sourcing"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-sm bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <CheckCircle2 strokeWidth={2} className="w-3.5 h-3.5 text-[hsl(var(--success))]" />
                  </div>
                  <span className="text-base text-primary/80 font-medium tracking-tight group-hover:text-secondary transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-xl grayscale-[0.5] contrast-110 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1609143739217-01b60dad1c67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Global Logistics" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* 4. ABOUT US & CERTIFICATION */}
      <Section id="about" className="bg-[#05070a] py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Level Heading Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-[1px] bg-secondary" />
                <h2 className="text-[10px] font-bold text-secondary uppercase tracking-[0.4em]">Compliance Framework</h2>
              </div>

              <h3 className="text-5xl md:text-8xl font-black text-white mb-10 leading-[0.95] tracking-tighter uppercase whitespace-pre-line">
                Verified <br />
                <span className="font-serif italic font-light text-secondary lowercase">& authorized.</span>
              </h3>

              <p className="text-lg text-white/50 mb-10 leading-relaxed font-medium max-w-xl">
                We operate with full licensing and government authorizations. Our FSSAI certification validates our commitment to global food safety standards and ethical agro-trade practices.
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

            {/* Informational Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Import Export Code", desc: "DGFT - GOVT. OF INDIA", icon: Package },
                { title: "GST Registered", desc: "TAX & LEGAL ENTITY", icon: Shield },
                { title: "FIEO Member", desc: "FEDERATION OF EXPORT ORG.", icon: Globe },
                { title: "FSSAI Licensed", desc: "FOOD SAFETY AUTHORITY", icon: FileCheck },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 bg-white/[0.02] border border-white/10 rounded-[4px] flex items-center gap-5 group hover:bg-white/[0.05] transition-all"
                >
                  <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-all">
                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-white uppercase tracking-wider mb-1">{item.title}</h4>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium Security Footer */}
          {/* Premium Security Footer */}
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-white/20 pt-16 border-t border-white/5">
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">Confidential Access</span>
            <div className="w-12 h-px bg-white/10" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">Digitally Protected</span>
            <div className="h-px w-12 bg-white/10" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em]">Institutional Merit</span>
          </div>
        </div>
      </Section>

      {/* 5. PRODUCT PREVIEW */}
      <Section id="products" className="bg-primary py-24 overflow-hidden border-y border-secondary/20">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight uppercase">Premier <span className="font-serif italic font-light text-secondary">Trade Inventory</span></h3>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-0">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {productsList.map((item, i) => (
                <CarouselItem key={i} className="basis-full">
                  <Link href="/products" className="group block relative">
                    <div className="aspect-[16/9] overflow-hidden bg-card rounded-2xl shadow-2xl relative ring-1 ring-primary/10">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h4 className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tighter">{item.title}</h4>
                          <span className="inline-flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                            Technical Specifications <ArrowRight className="w-4 h-4" />
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2">
              <CarouselPrevious className="h-12 w-12 border-primary/10 hover:bg-primary hover:text-white transition-all shadow-xl bg-background" />
            </div>
            <div className="absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2">
              <CarouselNext className="h-12 w-12 border-primary/10 hover:bg-primary hover:text-white transition-all shadow-xl bg-background" />
            </div>
          </Carousel>
        </div>

        <div className="mt-12 text-center">
          <Link href="/products" className="inline-flex items-center gap-4 text-primary font-black text-[11px] uppercase tracking-[0.4em] hover:text-secondary transition-all border-b-2 border-secondary/40 pb-2">
            View Institutional Inventory
          </Link>
        </div>
      </Section>

      {/* 6. TRUST & CREDENTIALS */}
      <Section className="bg-background border-y border-secondary/20 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-16">
            <div className="w-10 h-[1px] bg-secondary" />
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Compliance & Credentials</span>
            <div className="w-10 h-[1px] bg-secondary" />
          </div>

          <div className="flex flex-wrap justify-center gap-x-16 gap-y-10 mb-16">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 bg-secondary/10 rounded-sm flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Shield strokeWidth={1} className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase tracking-[0.1em] text-[9px] text-secondary">GST Standardized</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 bg-secondary/10 rounded-sm flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <FileCheck strokeWidth={1} className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase tracking-[0.1em] text-[9px] text-secondary">IEC Registered</span>
            </div>
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 bg-secondary/10 rounded-sm flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Globe strokeWidth={1} className="w-6 h-6" />
              </div>
              <span className="font-bold uppercase tracking-[0.1em] text-[9px] text-secondary">MENA Operations</span>
            </div>
          </div>
          <p className="text-xl text-primary/80 leading-relaxed max-w-2xl mx-auto font-medium font-serif italic border-t border-secondary/20 pt-10">
            Provisioning Tier-I buyers across UAE, Oman, Qatar, and the European Continent with institutional-grade sourcing and ethical compliance.
          </p>
        </div>
      </Section>

      {/* 7. CONTACT CTA */}
      <Section className="bg-[#0b1626] text-white py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
            Initiate Your <span className="font-serif italic font-light text-[#c09a40]">Export Directive.</span>
          </h2>
          <p className="text-lg text-white/70 mb-16 font-medium max-w-2xl mx-auto leading-relaxed">
            Consult with our Trade Commissioners for institutional bulk inquiries and specialized MENA sourcing requirements.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <a
              href="https://wa.me/919005230333?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20I%20would%20like%20to%20know%20more."
              className="flex flex-col items-center p-10 bg-white/5 border border-secondary/20 rounded-sm hover:bg-white/10 transition-all group"
            >
              <MessageCircle className="w-10 h-10 mb-4 text-secondary group-hover:text-[hsl(var(--success))] transition-colors" strokeWidth={1} />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3 font-bold">Secure Trade Canal</span>
              <span className="text-xl font-bold tracking-tight text-white">+91 9005230333</span>
            </a>
            <a
              href="mailto:info@panoraexport.com"
              className="flex flex-col items-center p-10 bg-white/5 border border-secondary/20 rounded-sm hover:bg-white/10 transition-all group"
            >
              <Mail className="w-10 h-10 mb-4 text-secondary group-hover:text-white transition-colors" strokeWidth={1} />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3 font-bold">Official Correspondence</span>
              <span className="text-xl font-bold tracking-tight text-white">info@panoraexport.com</span>
            </a>
          </div>

          <div className="inline-flex items-center gap-3 text-white/30 text-[9px] uppercase font-bold tracking-[0.4em]">
            <MapPin className="w-3.5 h-3.5 text-secondary" />
            106, Tulip C, SEC-11, 819/3, Indra Nagar, Lucknow, UP 226016
          </div>
        </div>
      </Section>

      <footer className="py-20 bg-[#0b1626] border-t border-[#c09a40]/20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <Link href="/" className="flex flex-col items-center md:items-start group">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-xl tracking-tight text-white">
                PANORA
              </span>
              <span className="font-serif italic text-[#c09a40] text-lg font-light">
                exports
              </span>
            </div>
            <span className="text-[8px] text-white/50 uppercase tracking-[0.3em] font-bold mt-2">
              Global Exports
            </span>
          </Link>

          <div className="text-white/40 text-[9px] uppercase font-bold tracking-[0.2em] order-3 md:order-2">
            © 2025 Panora Exports.
          </div>

          <div className="flex gap-10 order-2 md:order-3">
            {[
              { label: 'Products', href: '/products' },
              { label: 'About', href: '/about' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Contact', href: '/contact' }
            ].map((link, i) => (
              <Link key={i} href={link.href} className="text-[9px] uppercase tracking-[0.1em] font-bold text-white/60 hover:text-[#c09a40] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/919005230333?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20I%20would%20like%20to%20know%20more."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 w-20 h-20 bg-[hsl(var(--success))] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-500 z-50 group border border-white/20"
      >
        <MessageCircle className="w-8 h-8" strokeWidth={1} />
        <span className="absolute right-full mr-6 bg-primary text-white py-3 px-6 rounded-sm shadow-2xl text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-secondary/20">
          Initialize Secure Trade Channel
        </span>
      </a>
    </div>
  );
}
