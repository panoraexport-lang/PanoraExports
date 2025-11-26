import { motion } from "framer-motion";
import { ArrowRight, Layers, Zap, Box, Globe2, BarChart2 } from "lucide-react";
import shipImage from "@assets/stock_images/aerial_view_of_large_d81dccd1.jpg";
import warehouseImage from "@assets/stock_images/modern_automated_log_e4071bac.jpg";

export default function Demo2() {
  return (
    <div className="font-tech-body bg-slate-950 text-slate-50 selection:bg-cyan-500 selection:text-black min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-tech-heading text-2xl font-bold tracking-wide flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-sm rotate-45" />
            VORTEX
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Platform</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Solutions</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Developers</a>
          </div>
          <button className="border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 px-5 py-2 text-sm rounded-lg transition-all">
            Client Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={shipImage} alt="Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium"
            >
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              Next-Gen Logistics OS 2.0
            </motion.div>
            
            <h1 className="font-tech-heading text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Future-proof <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                supply chains.
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
              Leverage AI-driven insights and automated workflows to optimize your global trade operations in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-cyan-500 text-black px-8 py-4 rounded-lg font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Deploy Solution
              </button>
              <button className="px-8 py-4 rounded-lg font-medium text-slate-300 hover:bg-slate-900 transition-all flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-cyan-500 border-b-4 border-b-transparent ml-1" />
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
            <div className="flex justify-between items-center mb-8">
              <div className="text-sm font-medium text-slate-400">Shipment Status</div>
              <div className="text-cyan-400 text-xs font-mono bg-cyan-950/50 px-2 py-1 rounded">ID: #SHP-8842</div>
            </div>
            
            <div className="space-y-6">
              {[
                { city: "Shanghai", time: "08:00 UTC", status: "Departed", active: false },
                { city: "Singapore", time: "14:30 UTC", status: "In Transit", active: true },
                { city: "Rotterdam", time: "Est. 2 days", status: "Pending", active: false },
              ].map((stop, i) => (
                <div key={i} className="flex items-center gap-4 relative">
                   {i !== 2 && <div className="absolute left-[19px] top-8 bottom-[-24px] w-0.5 bg-slate-800" />}
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${stop.active ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'border-slate-800 bg-slate-900 text-slate-600'}`}>
                     <Globe2 className="w-5 h-5" />
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between mb-1">
                       <span className={`font-medium ${stop.active ? 'text-white' : 'text-slate-500'}`}>{stop.city}</span>
                       <span className="text-xs text-slate-500 font-mono">{stop.time}</span>
                     </div>
                     <div className="text-xs text-slate-400">{stop.status}</div>
                   </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Features */}
      <section className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-tech-heading text-3xl md:text-5xl font-bold mb-4">Engineered for <span className="text-cyan-400">Speed</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our proprietary technology stack integrates directly with customs APIs, carrier networks, and warehouse systems.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Real-time Analytics", desc: "Live telemetry from IoT sensors on every container." },
              { icon: Layers, title: "Automated Compliance", desc: "AI-powered document verification and customs filing." },
              { icon: Box, title: "Smart Warehousing", desc: "Robotic fulfillment integration for zero-error dispatch." },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl hover:border-cyan-500/50 transition-colors group">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 font-tech-heading">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={warehouseImage} alt="Tech Warehouse" className="w-full h-full object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="font-tech-heading text-4xl md:text-5xl font-bold mb-6">Total Visibility. <br />Zero Blindspots.</h2>
            <div className="space-y-6">
              {[
                { label: "API Latency", value: "< 50ms" },
                { label: "Data Points / Day", value: "2.5 Billion" },
                { label: "Uptime Guarantee", value: "99.99%" }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden max-w-xs">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                      className="h-full bg-cyan-500"
                    />
                  </div>
                  <div className="text-sm font-mono text-cyan-400 whitespace-nowrap">{stat.label}: {stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="font-tech-heading text-xl font-bold text-slate-300 mb-4 md:mb-0">VORTEX</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400">Status</a>
            <a href="#" className="hover:text-cyan-400">Documentation</a>
            <a href="#" className="hover:text-cyan-400">Support</a>
          </div>
          <div className="mt-4 md:mt-0">© 2025 Vortex Systems. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
