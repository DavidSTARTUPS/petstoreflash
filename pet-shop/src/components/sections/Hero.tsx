import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export const Hero: React.FC = () => (
  <section className="relative overflow-hidden bg-primary">
    {/* Background image */}
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1450778869180-e77f2aea5c52?w=1600&h=900&fit=crop&q=75"
        alt=""
        className="w-full h-full object-cover opacity-15"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85" />
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      {/* Text */}
      <motion.div initial="hidden" animate="visible" className="flex-1 text-center lg:text-left">
        <motion.span
          variants={fadeUp} custom={0}
          className="inline-block bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20"
        >
          ⭐ 4.7 Rating · 33 Recenzii pe Google
        </motion.span>

        <motion.h1
          variants={fadeUp} custom={1}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading tracking-tight leading-[1.1] mb-6"
        >
          Hrană premium pentru{' '}
          <br className="hidden sm:block" />
          <span className="text-white/90">prietenul tău</span>
        </motion.h1>

        <motion.p
          variants={fadeUp} custom={2}
          className="text-base sm:text-lg text-white/75 max-w-xl mb-4 sm:mb-5 leading-relaxed mx-auto lg:mx-0"
        >
          Lucky Pet Shop — magazinul din București cu cele mai bune produse naturale
          pentru câini și pisici. Calitate verificată, prețuri corecte.
        </motion.p>

        <motion.div
          variants={fadeUp} custom={2.5}
          className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 mb-8 sm:mb-10 mx-auto lg:mx-0"
        >
          <span className="text-2xl">🔄</span>
          <div className="text-left">
            <p className="text-white font-bold text-sm sm:text-base">Abonament lunar — economisești până la 15%</p>
            <p className="text-white/60 text-xs sm:text-sm">Livrare automată, anulezi oricând. Fără obligații.</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <motion.a
            href="#products"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 min-h-[44px] inline-flex items-center justify-center text-base"
          >
            Vezi Produsele
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
          <motion.a
            href="#visit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-200 min-h-[44px] inline-flex items-center justify-center text-base"
          >
            📍 Vizitează Magazinul
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="flex-1 hidden lg:flex justify-center"
      >
        <div className="relative w-[380px] h-[380px] xl:w-[420px] xl:h-[420px]">
          <div className="absolute inset-0 bg-white/10 rounded-3xl rotate-6" />
          <img
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop&q=80"
            alt="Câine fericit"
            className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  </section>
);
