import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function DemoSwitcher() {
  const [location, setLocation] = useLocation();

  const demos = [
    { id: "/demo1", name: "Swiss/Corp" },
    { id: "/demo2", name: "Dark/Tech" },
    { id: "/demo3", name: "Luxury/Edit" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md text-white p-1.5 rounded-full shadow-2xl border border-white/10 flex gap-1">
      {demos.map((demo) => (
        <button
          key={demo.id}
          onClick={() => setLocation(demo.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
            location === demo.id ? "text-black" : "text-white/70 hover:text-white"
          }`}
        >
          {location === demo.id && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{demo.name}</span>
        </button>
      ))}
    </div>
  );
}
