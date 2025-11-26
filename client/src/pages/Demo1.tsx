import { motion } from "framer-motion";
import { ArrowRight, Globe, Anchor, Plane, Truck, Package, BarChart3, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import abstractMap from "@assets/stock_images/abstract_global_netw_c623b35b.jpg";
import shipImage from "@assets/stock_images/aerial_view_of_large_d81dccd1.jpg";

export default function Demo1() {
  return (
    <div className="font-swiss-body bg-white text-black selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-swiss-heading text-2xl font-bold tracking-tighter">
            NEXUS<span className="text-blue-600">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#network" className="hover:text-blue-600 transition-colors">Network</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <button className="bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-blue-600 transition-colors">
            Get Quote
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block mb-6 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold tracking-widest uppercase">
              Global Supply Chain Solutions
            </div>
            <h1 className="font-swiss-heading text-6xl md:text-8xl font-medium leading-[0.9] mb-8 tracking-tight">
              Move world <br />
              <span className="text-blue-600">without limits.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-md mb-10 leading-relaxed">
              We architect advanced logistics solutions for the world's most demanding industries. Efficiency, precision, and speed combined.
            </p>
            <div className="flex gap-4">
              <button className="group bg-blue-600 text-white px-8 py-4 text-sm font-medium hover:bg-blue-700 transition-all flex items-center gap-2">
                Start Shipping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 text-sm font-medium border border-gray-200 hover:border-black transition-colors">
                Track Cargo
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] bg-gray-100 overflow-hidden"
          >
             <img 
              src={shipImage} 
              alt="Container Ship" 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 hover:scale-100"
            />
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
          </motion.div>
        </div>
        
        {/* Ticker */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 py-6 bg-white">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-gray-400 text-sm font-swiss-heading uppercase tracking-widest">
            <span>New York</span>
            <span>London</span>
            <span>Dubai</span>
            <span>Singapore</span>
            <span>Shanghai</span>
            <span>Tokyo</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Countries Served", value: "150+" },
            { label: "Annual Tonnage", value: "2.5M" },
            { label: "Warehouses", value: "45" },
            { label: "Client Satisfaction", value: "99%" },
          ].map((stat, i) => (
            <div key={i} className="border-l-2 border-blue-600 pl-6">
              <div className="font-swiss-heading text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="font-swiss-heading text-4xl md:text-6xl max-w-2xl leading-tight">
              Comprehensive logistics <br /> infrastructure.
            </h2>
            <a href="#" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:gap-4 transition-all">
              View all services <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-gray-200 border border-gray-200">
            {[
              { icon: Anchor, title: "Ocean Freight", desc: "Full container load (FCL) and less than container load (LCL) shipments globally." },
              { icon: Plane, title: "Air Freight", desc: "Expedited air cargo solutions for time-sensitive high-value goods." },
              { icon: Truck, title: "Land Transportation", desc: "Seamless road and rail networks connecting ports to inland destinations." },
              { icon: Package, title: "Warehousing", desc: "Smart storage and inventory management systems." },
              { icon: ShieldCheck, title: "Customs Brokerage", desc: "Expert clearance services ensuring compliance across borders." },
              { icon: Globe, title: "Supply Chain", desc: "End-to-end visibility and optimization of your logistics flow." },
            ].map((service, i) => (
              <div key={i} className="bg-white p-12 hover:bg-blue-50 transition-colors group cursor-pointer">
                <service.icon className="w-10 h-10 mb-8 text-gray-400 group-hover:text-blue-600 transition-colors" strokeWidth={1.5} />
                <h3 className="font-swiss-heading text-2xl font-medium mb-4">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature / Map Section */}
      <section id="network" className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={abstractMap} alt="Global Network" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="font-swiss-heading text-5xl md:text-7xl mb-8">
              Global reach, <br />
              <span className="text-blue-500">local expertise.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-xl">
              Our integrated network spans across 6 continents, ensuring your cargo is always in safe hands, no matter the destination.
            </p>
            <button className="bg-white text-black px-8 py-4 text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors">
              Explore Our Network
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-swiss-heading text-4xl md:text-6xl mb-8">Ready to streamline your logistics?</h2>
          <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto">
            Partner with NEXUS for reliable, scalable, and efficient global shipping solutions tailored to your business.
          </p>
          <button className="bg-white text-blue-600 px-10 py-5 text-lg font-medium hover:bg-black hover:text-white transition-colors">
            Request a Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-20 pb-10 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="font-swiss-heading text-2xl font-bold mb-6">NEXUS.</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Premier global logistics partner delivering excellence in supply chain management since 1995.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-blue-600">Ocean Freight</a></li>
              <li><a href="#" className="hover:text-blue-600">Air Freight</a></li>
              <li><a href="#" className="hover:text-blue-600">Warehousing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600">News</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex justify-between items-center pt-8 border-t border-gray-200 text-xs text-gray-400">
          <div>© 2025 NEXUS Logistics Inc.</div>
          <div className="flex gap-4">
            <span>LinkedIn</span>
            <span>Twitter</span>
            <span>Instagram</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
