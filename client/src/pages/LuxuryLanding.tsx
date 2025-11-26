import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, Globe, MapPin, Shield, Clock, Star, Anchor, Plane, Box, CheckCircle2, Menu, X, BarChart3, Truck, Users, Leaf, ChevronDown, ChevronUp, Play, Sun, Moon } from "lucide-react";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";

// Assets
import marbleTexture from "@assets/stock_images/luxury_gold_and_whit_bd54d3a5.jpg";
import jetInterior from "@assets/stock_images/private_jet_interior_81593a0e.jpg";
import goldenGlobe from "@assets/stock_images/cinematic_golden_glo_6214e3e2.jpg";
import chartImage from "@assets/stock_images/abstract_3d_financia_706fec90.jpg";
import luxuryShip from "@assets/stock_images/luxury_container_shi_990cf15c.jpg";
import watchMech from "@assets/stock_images/close_up_of_expensiv_c5a5e676.jpg";
import architecture from "@assets/stock_images/sleek_modern_archite_f51dbae2.jpg";
import boardroom from "@assets/stock_images/luxury_executive_boa_09abd54e.jpg";
import windTurbine from "@assets/stock_images/sustainable_energy_w_b9cc32ff.jpg";
import digitalNet from "@assets/stock_images/abstract_digital_net_4fec1cb6.jpg";
import leather from "@assets/stock_images/luxury_leather_textu_3abc8012.jpg";
import gallery from "@assets/stock_images/modern_art_gallery_i_d5008c72.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Grain = () => (
  <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-overlay" 
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
  />
);

const AnimatedCounter = ({ value, label, suffix = "" }: { value: string, label: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="text-center group cursor-default">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-luxury-heading text-5xl md:text-7xl text-[#d4af37] mb-3 italic relative inline-block"
      >
        {value}{suffix}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-2 left-0 w-full h-px bg-[#d4af37]/30 origin-left" 
        />
      </motion.div>
      <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium mt-2 group-hover:text-[#d4af37] transition-colors duration-500">{label}</div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="bg-white p-10 border border-[#d4af37]/10 hover:border-[#d4af37] transition-all duration-700 group hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-[#d4af37]/10"
  >
    <div className="w-14 h-14 bg-[#fdfbf7] border border-[#d4af37]/20 rounded-full flex items-center justify-center text-[#d4af37] mb-8 group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
      <Icon strokeWidth={1.2} className="w-6 h-6" />
    </div>
    <h3 className="font-luxury-heading text-2xl mb-4 text-slate-900 group-hover:text-[#d4af37] transition-colors duration-500 italic">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm font-light">{desc}</p>
    <div className="mt-8 flex items-center text-[#d4af37] text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
      Learn More <ArrowRight className="w-3 h-3 ml-2" />
    </div>
  </motion.div>
);

const ParallaxSection = ({ children, bgImage, overlayOpacity = 0.4 }: { children: React.ReactNode, bgImage: string, overlayOpacity?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden py-20">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0 will-change-transform">
        <img src={bgImage} alt="Background" className="w-full h-[130%] object-cover" />
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </motion.div>
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
};

const AccordionItem = ({ question, answer, isOpen, onClick }: any) => (
  <div className="border-b border-[#d4af37]/20">
    <button 
      onClick={onClick}
      className="w-full py-6 flex justify-between items-center text-left hover:text-[#d4af37] transition-colors group"
    >
      <span className="font-luxury-heading text-xl md:text-2xl italic text-slate-800 group-hover:text-[#d4af37] transition-colors">{question}</span>
      {isOpen ? <ChevronUp className="text-[#d4af37]" /> : <ChevronDown className="text-slate-400 group-hover:text-[#d4af37]" />}
    </button>
    <motion.div 
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <p className="pb-8 text-slate-500 leading-relaxed font-light max-w-3xl">{answer}</p>
    </motion.div>
  </div>
);

export default function LuxuryLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // --- GSAP ScrollTrigger Logic for Earth Zoom ---
  const containerRef = useRef(null);
  const earthRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  
  useGSAP(() => {
    // Create a timeline that is scrubbed by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Pin for 300% of the viewport height
        scrub: 1,      // Smooth scrubbing
        pin: true,     // Lock the container in place
        anticipatePin: 1
      }
    });

    // 1. Start with Earth small (0.5) and Text visible
    tl.set(earthRef.current, { scale: 0.5, opacity: 0.8 });
    tl.set(textRef.current, { opacity: 1, y: 0 });
    tl.set(overlayRef.current, { opacity: 0 });

    // 2. Zoom Earth IN (to 1.5x)
    tl.to(earthRef.current, { 
      scale: 1.5, 
      duration: 10, 
      ease: "power2.inOut" 
    }, 0);

    // 3. Keep text visible but move it up slightly
    tl.to(textRef.current, { 
      opacity: 1, // Text remains visible
      y: -50, // Move up slightly
      duration: 10, 
      ease: "power1.out" 
    }, 0);

    // 4. Fade IN the data overlay halfway through the zoom
    tl.to(overlayRef.current, { 
      opacity: 1, 
      duration: 4, 
      ease: "power1.in" 
    }, 4); // Start at 40% of timeline

  }, { scope: containerRef }); // Scope to the container

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 550 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 700 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 1200 },
  ];

  return (
    <div className="font-luxury-body bg-[#fdfbf7] dark:bg-slate-950 text-slate-900 dark:text-white overflow-x-hidden selection:bg-[#d4af37] selection:text-white antialiased">
      <Grain />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#fbf5e6] to-[#d4af37] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isMenuOpen ? 'bg-[#fdfbf7] dark:bg-slate-950' : 'bg-[#fdfbf7]/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-[#d4af37]/20'}`}>
        <div className="max-w-[1800px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="font-luxury-heading text-3xl italic font-bold relative group cursor-pointer z-50 dark:text-white">
            Meridian<span className="text-[#d4af37]">.</span>
          </div>

          <div className="hidden lg:flex gap-12 text-xs uppercase tracking-[0.2em] font-medium text-slate-500 dark:text-slate-400">
            {["Heritage", "Concierge", "Fleet", "Network", "Insights", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#d4af37] transition-colors relative group py-2">
                {item}
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-[#d4af37] -translate-x-1/2 group-hover:w-full transition-all duration-500 ease-out" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-8">
             <button className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-slate-900 dark:text-white hover:text-[#d4af37] transition-colors group">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Network
             </button>
             <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 hidden md:block" />
             {mounted && (
               <button 
                 onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                 className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[#d4af37]/50 hover:border-[#d4af37] text-slate-900 dark:text-white hover:text-[#d4af37] transition-all duration-500"
                 data-testid="theme-toggle"
               >
                 {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
               </button>
             )}
             <button className="hidden md:block border border-[#d4af37] text-[#d4af37] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-white transition-all duration-500 relative overflow-hidden group">
              <span className="relative z-10">Client Portal</span>
              <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
            <button className="lg:hidden text-slate-800 dark:text-white z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : "-100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-[#fdfbf7] dark:bg-slate-950 z-40 flex flex-col items-center justify-center lg:hidden gap-12 pt-24"
        >
          <div className="flex flex-col items-center gap-8">
            {["Heritage", "Concierge", "Fleet", "Network", "Insights", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="font-luxury-heading text-4xl italic text-slate-900 dark:text-white hover:text-[#d4af37] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-8 flex items-center justify-center w-12 h-12 rounded-full border border-[#d4af37]/50 hover:border-[#d4af37] text-slate-900 dark:text-white hover:text-[#d4af37] transition-all duration-500"
            >
              {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          )}
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden dark:bg-slate-900">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 z-0 dark:opacity-80"
        >
          <img src={jetInterior} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </motion.div>

        <div className="relative z-10 text-center text-white max-w-6xl px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-10">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: 60 }} 
                transition={{ duration: 1, delay: 0.8 }} 
                className="h-px bg-[#d4af37]" 
              />
              <span className="text-[#d4af37] text-sm font-bold tracking-[0.4em] uppercase">Est. 1985</span>
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: 60 }} 
                transition={{ duration: 1, delay: 0.8 }} 
                className="h-px bg-[#d4af37]" 
              />
            </div>
            <h1 className="font-luxury-heading text-7xl md:text-9xl lg:text-[10rem] mb-8 leading-[0.9] italic drop-shadow-2xl mix-blend-overlay opacity-90">
              The Art of <br /> Movement
            </h1>
            <p className="text-lg md:text-xl font-light text-white/90 max-w-2xl mx-auto mb-16 leading-loose tracking-wide">
              Experience a new standard in global logistics. Where precision meets prestige, and your cargo is treated with the reverence it deserves.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <button className="bg-[#d4af37] text-white px-12 py-5 text-sm uppercase tracking-widest hover:bg-white hover:text-[#d4af37] transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.3)] border border-[#d4af37]">
                Begin Consultation
              </button>
              <button className="group relative px-12 py-5 text-sm uppercase tracking-widest text-white border border-white/30 hover:border-white transition-colors duration-500 overflow-hidden">
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">View Services</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-4 cursor-pointer hover:text-white transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        </motion.div>
      </section>

      {/* Heritage / Story Section */}
      <section id="heritage" className="py-40 px-8 bg-[#fdfbf7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#d4af37]/5 skew-x-12 translate-x-40" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="relative group">
            <div className="absolute -top-10 -left-10 w-60 h-60 border border-[#d4af37]/20 rounded-full animate-spin-slow opacity-50" />
            <div className="overflow-hidden">
               <img src={watchMech} alt="Precision" className="relative z-10 shadow-2xl w-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-12 -right-12 bg-white p-12 shadow-2xl border-t-4 border-[#d4af37] z-20 max-w-sm hidden md:block">
              <p className="font-luxury-heading italic text-3xl mb-4 text-slate-800">"Precision is not an act, it is a habit."</p>
              <p className="text-xs uppercase tracking-wider text-slate-400">— Founder, 1985</p>
            </div>
          </div>
          <div>
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-6">Our Philosophy</span>
            <h2 className="font-luxury-heading text-6xl md:text-7xl text-slate-900 mb-10 italic leading-tight">
              Curating the <br />
              <span className="text-[#d4af37]">Exceptional.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-light">
              Meridian was founded on the principle that logistics is not merely a transaction, but a vital artery of global commerce. For three decades, we have served the world's most distinguished brands with an unyielding commitment to excellence.
            </p>
            <div className="space-y-6 mb-16">
              {[
                "White-glove handling services for art & antiques", 
                "Secure vault storage in Zurich, London, & Singapore", 
                "Private charter fleet access with < 4hr notice"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 w-6 h-6 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-300">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="text-sm uppercase tracking-wider text-slate-800 pt-1">{item}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-12 border-t border-slate-200 pt-12">
              <AnimatedCounter value="150" label="Countries" suffix="+" />
              <AnimatedCounter value="40" label="Deliveries" suffix="k" />
              <AnimatedCounter value="30" label="Years" />
            </div>
          </div>
        </div>
      </section>

      {/* The Process - Horizontal Scroll Idea (Vertical Implementation for now) */}
      <section className="py-40 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url(${digitalNet})`, backgroundSize: 'cover' }} />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-24">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-6">Methodology</span>
            <h2 className="font-luxury-heading text-5xl md:text-7xl mb-6 italic">The Meridian Standard</h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto" />
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "We begin by understanding the unique requirements of your cargo and timeline." },
              { step: "02", title: "Strategy", desc: "Our architects design a bespoke routing plan optimizing for security and speed." },
              { step: "03", title: "Execution", desc: "Your assets move under the watchful eye of our 24/7 command center." },
              { step: "04", title: "Delivery", desc: "White-glove handover at the final destination with biometric verification." },
            ].map((item, i) => (
              <div key={i} className="relative p-8 border-l border-[#d4af37]/20 hover:border-[#d4af37] transition-colors duration-500 group">
                <div className="text-6xl font-luxury-heading text-[#d4af37]/20 mb-8 group-hover:text-[#d4af37] transition-colors duration-500">{item.step}</div>
                <h3 className="text-2xl font-luxury-heading italic mb-4">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GSAP PINNED SECTION: Global Intelligence */}
      <div ref={containerRef} className="relative bg-black h-screen w-full overflow-hidden flex items-center justify-center">
        <div ref={earthRef} className="absolute inset-0 flex items-center justify-center w-full h-full">
           <img src={goldenGlobe} alt="Global" className="w-full h-full object-cover opacity-80" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div ref={textRef} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center max-w-5xl px-6">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-8 animate-pulse">Live Telemetry</span>
            <h2 className="font-luxury-heading text-7xl md:text-9xl text-white mb-8 italic drop-shadow-2xl">
              Global Intelligence
            </h2>
            <p className="text-xl text-white/80 font-light max-w-2xl mx-auto backdrop-blur-md bg-white/5 p-8 rounded-none border border-white/10">
              Real-time telemetry across 6 continents. We monitor your assets with military-grade precision, ensuring total visibility at every coordinate.
            </p>
          </div>
        </div>

        {/* Simulated UI elements appearing on zoom */}
        <div ref={overlayRef} className="absolute inset-0 z-20 pointer-events-none p-12 flex flex-col justify-between opacity-0">
          <div className="flex justify-between items-start">
            <div className="bg-black/50 backdrop-blur-md border border-[#d4af37]/30 p-4 font-mono text-xs text-[#d4af37]">
              <div>LAT: 51.5074° N</div>
              <div>LNG: 0.1278° W</div>
              <div className="mt-2 text-white">STATUS: MONITORING</div>
            </div>
            <div className="bg-black/50 backdrop-blur-md border border-[#d4af37]/30 p-4 font-mono text-xs text-[#d4af37] text-right">
              <div>ACTIVE VESSELS: 142</div>
              <div>AIRBORNE UNITS: 28</div>
              <div className="mt-2 text-white">SYSTEM: OPTIMAL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Concierge Services */}
      <section id="concierge" className="py-40 px-6 bg-[#fdfbf7] text-slate-900 relative">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 sticky top-40 self-start">
              <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-6">Capabilities</span>
              <h2 className="font-luxury-heading text-6xl md:text-7xl mb-8 italic leading-none">The Concierge Standard</h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-12">
                We do not simply move cargo; we engineer its journey. Every shipment is assigned a dedicated concierge manager who oversees every nautical mile.
              </p>
              <button className="bg-[#0f172a] text-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-[#d4af37] transition-colors duration-500">
                Download Service Guide
              </button>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
              <FeatureCard 
                icon={Shield} 
                title="Secure Transport" 
                desc="Armored transport options for high-value assets including art, jewelry, and bullion. GPS-locked containers that only open at destination."
                delay={0}
              />
              <FeatureCard 
                icon={Clock} 
                title="Expedited Customs" 
                desc="Pre-clearance and diplomatic channels to ensure your cargo never waits at the border. We handle the bureaucracy."
                delay={0.2}
              />
              <FeatureCard 
                icon={Globe} 
                title="Global Compliance" 
                desc="Navigating complex regulatory environments in over 150 jurisdictions with local experts who understand regional nuances."
                delay={0.4}
              />
              <FeatureCard 
                icon={Box} 
                title="Bespoke Packaging" 
                desc="Custom crating and climate-controlled containers built specifically for your items. Vibration monitoring for fragile assets."
                delay={0.6}
              />
              <FeatureCard 
                icon={Anchor} 
                title="Maritime Excellence" 
                desc="Priority berthing and guaranteed slot availability on premier vessel alliances. Your cargo never rolls."
                delay={0.8}
              />
              <FeatureCard 
                icon={Plane} 
                title="Air Charter" 
                desc="On-demand aircraft availability for urgent or oversized cargo requirements. From Learjets to Antonovs."
                delay={1}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <ParallaxSection bgImage={windTurbine} overlayOpacity={0.6}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center h-full py-20">
          <div className="text-white">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-6 flex items-center gap-2">
              <Leaf className="w-4 h-4" /> Sustainability
            </span>
            <h2 className="font-luxury-heading text-6xl md:text-8xl mb-8 italic">Eco-Conscious <br />Logistics</h2>
            <p className="text-lg font-light text-white/80 mb-12 leading-loose">
              Luxury is responsibility. We are committed to carbon-neutral shipping options for all client tiers. Through reforestation partnerships and bio-fuel vessels, we ensure your legacy protects the planet.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-luxury-heading text-[#d4af37] mb-2">100%</div>
                <div className="text-xs uppercase tracking-widest text-white/60">Offset Available</div>
              </div>
              <div>
                <div className="text-4xl font-luxury-heading text-[#d4af37] mb-2">2030</div>
                <div className="text-xs uppercase tracking-widest text-white/60">Net Zero Goal</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="border border-white/20 p-12 backdrop-blur-md bg-white/5 rounded-full aspect-square flex items-center justify-center">
               <div className="text-center">
                 <div className="font-luxury-heading text-white text-3xl italic mb-4">Green Lane</div>
                 <div className="text-xs uppercase tracking-widest text-[#d4af37]">Certified Partner</div>
               </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Fleet Showcase - Editorial Style */}
      <section id="fleet" className="py-40 bg-[#fdfbf7]">
        <div className="max-w-[1800px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div>
              <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-6">Our Assets</span>
              <h2 className="font-luxury-heading text-6xl md:text-7xl text-slate-900 italic">The Meridian Fleet</h2>
            </div>
            <p className="max-w-md text-slate-500 text-sm leading-relaxed mt-8 md:mt-0 border-l border-[#d4af37] pl-6">
              From Boeing 747-8F freighters to Triple-E class container vessels, our access to capacity is unmatched in the industry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-12 gap-6 h-[800px]">
            <div className="md:col-span-8 relative group overflow-hidden cursor-pointer">
              <img src={luxuryShip} alt="Ship" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-12 left-12 text-white z-10">
                <div className="text-[#d4af37] text-xs uppercase tracking-widest mb-3">Maritime</div>
                <h3 className="font-luxury-heading text-5xl italic group-hover:translate-x-4 transition-transform duration-500">Ocean Class</h3>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="flex-1 relative group overflow-hidden cursor-pointer">
                <img src={architecture} alt="Hub" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-8 left-8 text-white z-10">
                  <div className="text-[#d4af37] text-xs uppercase tracking-widest mb-2">Infrastructure</div>
                  <h3 className="font-luxury-heading text-3xl italic">Global Hubs</h3>
                </div>
              </div>
              <div className="flex-1 relative group overflow-hidden cursor-pointer">
                <img src={digitalNet} alt="Tech" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-8 left-8 text-white z-10">
                  <div className="text-[#d4af37] text-xs uppercase tracking-widest mb-2">Technology</div>
                  <h3 className="font-luxury-heading text-3xl italic">Command Center</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance / Analytics */}
      <section className="py-40 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-6">Metrics</span>
            <h2 className="font-luxury-heading text-5xl md:text-6xl mb-8 italic">Precision in <br />Numbers</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">
              We believe that true luxury is the absence of worry. Our performance metrics speak to a history of flawless execution.
            </p>
            
            <div className="grid grid-cols-2 gap-12">
               <div className="border-t border-[#d4af37]/30 pt-6">
                 <div className="text-3xl font-luxury-heading mb-2">99.9%</div>
                 <div className="text-xs uppercase tracking-widest text-slate-500">On-Time Arrival</div>
               </div>
               <div className="border-t border-[#d4af37]/30 pt-6">
                 <div className="text-3xl font-luxury-heading mb-2">0.01%</div>
                 <div className="text-xs uppercase tracking-widest text-slate-500">Claim Ratio</div>
               </div>
               <div className="border-t border-[#d4af37]/30 pt-6">
                 <div className="text-3xl font-luxury-heading mb-2">24/7</div>
                 <div className="text-xs uppercase tracking-widest text-slate-500">Live Support</div>
               </div>
               <div className="border-t border-[#d4af37]/30 pt-6">
                 <div className="text-3xl font-luxury-heading mb-2">ISO</div>
                 <div className="text-xs uppercase tracking-widest text-slate-500">9001 Certified</div>
               </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-luxury-heading text-2xl italic">Efficiency Index</h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#d4af37]" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37', color: '#fff', fontFamily: 'Montserrat' }}
                    itemStyle={{ color: '#d4af37' }}
                    cursor={{ stroke: '#d4af37', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Team */}
      <section className="py-40 px-8 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-6">Leadership</span>
            <h2 className="font-luxury-heading text-5xl md:text-6xl mb-6 italic text-slate-900">The Board</h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "Eleanor Sterling", role: "Chief Executive Officer", img: boardroom },
              { name: "James Rothschild", role: "Head of Global Operations", img: gallery },
              { name: "Sarah Chen", role: "Director of Strategy", img: architecture },
            ].map((person, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="overflow-hidden mb-6 relative h-[500px]">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                </div>
                <h3 className="font-luxury-heading text-2xl italic text-slate-900 mb-2 group-hover:text-[#d4af37] transition-colors">{person.name}</h3>
                <p className="text-xs uppercase tracking-widest text-slate-500">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <div className="mb-20">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-6">Insights</span>
            <h2 className="font-luxury-heading text-5xl mb-6 italic text-slate-900">Frequently Asked</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Do you handle customs clearance for high-value art?", a: "Yes. We have a dedicated Fine Art division that specializes in ATA Carnets, CITES permits, and temporary admission protocols for galleries and auction houses." },
              { q: "What is the maximum insurance coverage available?", a: "Through our partners at Lloyd's of London, we can arrange coverage up to $100M per conveyance. Higher limits are available upon special underwriting request." },
              { q: "Can you arrange private charter flights?", a: "Absolutely. We maintain standing agreements with operators of Boeing 747F, 777F, and Antonov aircraft for immediate deployment." },
              { q: "How do you ensure security during transit?", a: "We utilize a combination of armored escort, GPS/GSM geo-fencing, and satellite tracking. All personnel are vetted with enhanced background checks." },
            ].map((item, i) => (
              <AccordionItem 
                key={i} 
                question={item.q} 
                answer={item.a} 
                isOpen={openAccordion === i} 
                onClick={() => setOpenAccordion(i === openAccordion ? -1 : i)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-40 bg-[#1e1e1e] text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex justify-center gap-2 text-[#d4af37] mb-12">
            {[1,2,3,4,5].map(i => <Star key={i} fill="#d4af37" className="w-6 h-6" />)}
          </div>
          <h2 className="font-luxury-heading text-4xl md:text-6xl leading-tight mb-16 italic">
            "In the world of high-stakes logistics, Meridian has no equal. They handled our entire European expansion with a level of grace and efficiency I didn't think possible."
          </h2>
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-16 border border-[#d4af37] rounded-full p-1">
              <img src={boardroom} className="w-full h-full rounded-full object-cover grayscale" alt="CEO" />
            </div>
            <div className="text-left">
              <div className="font-bold text-xl font-luxury-heading italic">Alexander V.</div>
              <div className="text-[#d4af37] text-xs uppercase tracking-widest mt-1">CEO, Luxury Goods Conglomerate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-40 px-6 bg-[#fdfbf7] relative">
        <div className="max-w-7xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#d4af37]/10 p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-6">Inquiries</span>
              <h2 className="font-luxury-heading text-6xl mb-8 text-slate-900 italic">Request Concierge</h2>
              <p className="text-slate-500 mb-16 leading-relaxed font-light text-lg">
                Please provide details about your shipment requirements. Our dedicated team reviews all requests within 2 hours.
              </p>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-[#fdfbf7] flex items-center justify-center text-[#d4af37]">
                    <MapPin strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-xs">Headquarters</h4>
                    <p className="text-slate-500 font-luxury-heading italic text-xl">1 Knightsbridge Green<br/>London, SW1X 7QA</p>
                  </div>
                </div>
                <div className="flex gap-6">
                   <div className="w-12 h-12 bg-[#fdfbf7] flex items-center justify-center text-[#d4af37]">
                    <Globe strokeWidth={1} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-xs">Global Access</h4>
                    <p className="text-slate-500 font-luxury-heading italic text-xl">+44 20 7123 4567<br/>concierge@meridian.global</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="space-y-8 bg-[#fdfbf7]/50 p-10 border border-[#d4af37]/5">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-xs uppercase tracking-widest text-slate-500 group-focus-within:text-[#d4af37] transition-colors">First Name</label>
                  <input type="text" className="w-full border-b border-slate-200 py-3 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent font-luxury-heading italic text-xl" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs uppercase tracking-widest text-slate-500 group-focus-within:text-[#d4af37] transition-colors">Last Name</label>
                  <input type="text" className="w-full border-b border-slate-200 py-3 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent font-luxury-heading italic text-xl" />
                </div>
              </div>
              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-widest text-slate-500 group-focus-within:text-[#d4af37] transition-colors">Company</label>
                <input type="text" className="w-full border-b border-slate-200 py-3 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent font-luxury-heading italic text-xl" />
              </div>
              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-widest text-slate-500 group-focus-within:text-[#d4af37] transition-colors">Email</label>
                <input type="email" className="w-full border-b border-slate-200 py-3 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent font-luxury-heading italic text-xl" />
              </div>
              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-widest text-slate-500 group-focus-within:text-[#d4af37] transition-colors">Requirements</label>
                <textarea rows={4} className="w-full border-b border-slate-200 py-3 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent resize-none font-luxury-heading italic text-xl" />
              </div>
              <button className="bg-[#0f172a] text-white px-10 py-5 w-full text-sm uppercase tracking-widest hover:bg-[#d4af37] transition-colors duration-500 mt-6 shadow-xl">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white pt-32 pb-12 px-8 border-t border-[#d4af37]/30">
        <div className="max-w-[1800px] mx-auto grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className="font-luxury-heading text-5xl italic font-bold mb-10">Meridian.</div>
            <p className="text-white/40 max-w-md leading-relaxed font-light text-lg">
              The definitive standard in luxury logistics. Connecting the world's most prestigious brands with their global markets through uncompromised service.
            </p>
          </div>
          <div>
             <h4 className="font-bold mb-8 text-xs uppercase tracking-[0.2em] text-[#d4af37]">Sitemap</h4>
             <ul className="space-y-6 text-white/60 text-sm font-light">
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer hover:translate-x-2 duration-300 flex items-center gap-2"><ArrowRight className="w-3 h-3 opacity-0 hover:opacity-100" />Heritage</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer hover:translate-x-2 duration-300 flex items-center gap-2"><ArrowRight className="w-3 h-3 opacity-0 hover:opacity-100" />Concierge</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer hover:translate-x-2 duration-300 flex items-center gap-2"><ArrowRight className="w-3 h-3 opacity-0 hover:opacity-100" />Fleet</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer hover:translate-x-2 duration-300 flex items-center gap-2"><ArrowRight className="w-3 h-3 opacity-0 hover:opacity-100" />Careers</li>
             </ul>
          </div>
          <div>
             <h4 className="font-bold mb-8 text-xs uppercase tracking-[0.2em] text-[#d4af37]">Legal</h4>
             <ul className="space-y-6 text-white/60 text-sm font-light">
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Privacy Policy</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Terms of Service</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Cookie Policy</li>
             </ul>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 uppercase tracking-widest">
           <div>© 2025 Meridian Global Logistics. All rights reserved.</div>
           <div className="flex gap-12 mt-6 md:mt-0">
             <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
             <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
             <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
