import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background font-sans antialiased overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

      <div className="relative z-10 max-w-2xl w-full px-6 text-center">
        <div className="inline-flex items-center gap-4 mb-12 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full">
          <AlertCircle className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Protocol Interruption</span>
        </div>

        <h1 className="text-8xl md:text-[12rem] font-black text-foreground tracking-tighter mb-8 opacity-10">404</h1>

        <div className="space-y-6 mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight">
            Node <span className="font-serif italic text-primary font-normal">Disconnected.</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium max-w-md mx-auto leading-relaxed opacity-60">
            The requested trade node is no longer synchronized with the global registry. The asset may have been relocated or de-authorized.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full sm:w-auto">
          <Link href="/">
            <a className="w-full px-10 py-5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-90 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3">
              <Home className="w-4 h-4" strokeWidth={1.5} />
              Return to Terminal
            </a>
          </Link>
          <div className="flex gap-4">
            <Link href="/products">
              <a className="flex-1 px-6 py-4 bg-secondary/10 text-secondary text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-secondary/20 transition-all flex items-center justify-center border border-secondary/20">
                View Inventory
              </a>
            </Link>
            <Link href="/contact">
              <a className="flex-1 px-6 py-4 bg-secondary/10 text-secondary text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-secondary/20 transition-all flex items-center justify-center border border-secondary/20">
                Contact Support
              </a>
            </Link>
          </div>
        </div>
        <button
          onClick={() => window.history.back()}
          className="w-full sm:w-auto px-10 py-5 bg-card border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:bg-muted transition-all flex items-center justify-center gap-3 h-fit"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Reverse Routing
        </button>

        <div className="mt-24 flex items-center justify-center gap-4 text-primary/20 text-[9px] font-black uppercase tracking-[0.5em]">
          <div className="w-8 h-[1px] bg-primary/10" />
          <span>Panora Global Index v4.0.1</span>
          <div className="w-8 h-[1px] bg-primary/10" />
        </div>
      </div>
    </div>
  );
}
