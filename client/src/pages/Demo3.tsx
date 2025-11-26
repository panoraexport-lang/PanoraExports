import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin, Clock, Shield } from "lucide-react";
import handshakeImage from "@assets/stock_images/professional_busines_6830a51d.jpg";
import planeImage from "@assets/stock_images/air_freight_cargo_pl_951d7175.jpg";

export default function Demo3() {
  return (
    <div className="font-luxury-body bg-[#fdfbf7] text-[#1e293b] selection:bg-[#d4af37] selection:text-white">
      {/* Elegant Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-sm border-b border-[#e5e0d6]">
        <div className="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="font-luxury-heading text-3xl italic font-bold text-[#0f172a]">
            Meridian<span className="text-[#d4af37]">.</span>
          </div>
          <nav className="hidden md:flex gap-10 text-sm uppercase tracking-widest font-medium text-[#64748b]">
            <a href="#" className="hover:text-[#d4af37] transition-colors">Heritage</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Services</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Fleet</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Parallax Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={planeImage} alt="Luxury Cargo" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-[#0f172a]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-[#d4af37] text-sm font-bold tracking-[0.3em] uppercase mb-6">Est. 1985</div>
            <h1 className="font-luxury-heading text-6xl md:text-8xl mb-8 leading-none italic">
              The Art of <br /> Movement
            </h1>
            <p className="text-lg font-light text-white/80 max-w-xl mx-auto mb-12 leading-loose">
              Experience a new standard in global logistics. Where precision meets prestige, and your cargo is treated with the reverence it deserves.
            </p>
            <button className="border border-[#d4af37] text-[#d4af37] px-10 py-4 text-sm uppercase tracking-widest hover:bg-[#d4af37] hover:text-white transition-all duration-500">
              Discover More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Introduction - High Whitespace */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-luxury-heading text-4xl md:text-5xl text-[#0f172a] mb-12 italic">
            "We don't just transport goods; we uphold promises across oceans and borders."
          </h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto mb-12" />
          <p className="text-[#64748b] text-lg leading-relaxed">
            Meridian was founded on the principle that logistics is not merely a transaction, but a vital artery of global commerce. For three decades, we have served the world's most distinguished brands with an unyielding commitment to excellence.
          </p>
        </div>
      </section>

      {/* Image & Text Layout */}
      <section className="grid md:grid-cols-2">
        <div className="relative h-[600px]">
          <img src={handshakeImage} alt="Partnership" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="bg-[#0f172a] text-white p-16 md:p-24 flex flex-col justify-center">
          <div className="text-[#d4af37] mb-6">
            <Star className="w-6 h-6" />
          </div>
          <h3 className="font-luxury-heading text-4xl mb-8 italic">Concierge Logistics</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Our dedicated account managers provide white-glove service, ensuring meticulous attention to detail from origin to destination. We handle the complexities so you can focus on your legacy.
          </p>
          <ul className="space-y-6 mb-12">
            <li className="flex items-center gap-4 text-sm uppercase tracking-wider text-[#d4af37]">
              <span className="w-12 h-px bg-[#d4af37]" /> Priority Handling
            </li>
            <li className="flex items-center gap-4 text-sm uppercase tracking-wider text-[#d4af37]">
              <span className="w-12 h-px bg-[#d4af37]" /> Secure Vault Storage
            </li>
            <li className="flex items-center gap-4 text-sm uppercase tracking-wider text-[#d4af37]">
              <span className="w-12 h-px bg-[#d4af37]" /> Private Charter
            </li>
          </ul>
        </div>
      </section>

      {/* Services with elegant cards */}
      <section className="py-32 px-8 bg-[#e5e0d6]/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: MapPin, title: "Global Destinations", desc: "Access to exclusive trade routes and ports." },
              { icon: Clock, title: "Timeless Precision", desc: "Punctuality is the ultimate sign of respect." },
              { icon: Shield, title: "Impeccable Security", desc: "State-of-the-art protection for high-value assets." },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-8 text-[#0f172a] group-hover:text-[#d4af37] transition-colors">
                  <item.icon strokeWidth={1.5} />
                </div>
                <h4 className="font-luxury-heading text-2xl mb-4 italic text-[#0f172a]">{item.title}</h4>
                <p className="text-[#64748b] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white py-20 px-8 border-t border-[#d4af37]/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-luxury-heading text-4xl italic font-bold mb-12">Meridian.</div>
          <div className="flex justify-center gap-8 text-xs uppercase tracking-[0.2em] text-[#d4af37] mb-12">
            <a href="#">London</a>
            <span className="text-white/20">•</span>
            <a href="#">Paris</a>
            <span className="text-white/20">•</span>
            <a href="#">New York</a>
            <span className="text-white/20">•</span>
            <a href="#">Hong Kong</a>
          </div>
          <p className="text-white/40 text-sm font-light">
            © 2025 Meridian Global Logistics. An exemplar of excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}
