import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TRUST_ITEMS = [
  { icon: "🚚", label: "Livrare Rapidă", sub: "În București" },
  { icon: "✅", label: "Produse Verificate", sub: "Calitate garantată" },
  { icon: "💚", label: "Ingrediente Naturale", sub: "Fără chimicale" },
  { icon: "⭐", label: "4.7 pe Google", sub: "33 recenzii reale" },
];

export const TrustBar: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="flex items-center gap-3"
            >
              <span className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</span>
              <div className="min-w-0">
                <p className="font-bold text-sm text-text-main truncate">{item.label}</p>
                <p className="text-xs text-text-muted truncate">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
