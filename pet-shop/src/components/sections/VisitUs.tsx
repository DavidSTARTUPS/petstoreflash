import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { GoogleMapsData } from '../../data/storeConfig';

interface VisitUsProps {
  mapData: GoogleMapsData;
}

export const VisitUs: React.FC<VisitUsProps> = ({ mapData }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="visit" ref={ref} className="bg-surface py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-main font-heading tracking-tight mb-2">
            Vizitează-ne
          </h2>
          <p className="text-text-muted text-sm sm:text-base">Te așteptăm cu drag în magazin!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {/* Address & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-background rounded-2xl p-6 sm:p-8 border border-border"
          >
            {/* Location */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-text-main">Locație</h3>
            </div>
            <p className="text-text-body text-base leading-relaxed mb-3">{mapData.address}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(mapData.address)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline transition-colors min-h-[44px]"
            >
              Deschide în Google Maps
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Phone */}
            <div className="mt-6 pt-5 border-t border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium">Telefon</p>
                  <a
                    href={`tel:${mapData.phone.replace(/\s/g, '')}`}
                    className="font-bold text-text-main text-lg hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                  >
                    {mapData.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-text-main">{mapData.gmbRating} din 5</p>
                <p className="text-xs text-text-muted">{mapData.totalReviews} recenzii Google</p>
              </div>
            </div>
          </motion.div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-background rounded-2xl p-6 sm:p-8 border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-text-main">Program</h3>
            </div>
            <ul className="space-y-3">
              {mapData.workingHours.map((h, idx) => (
                <li key={idx} className="flex justify-between items-center py-1">
                  <span className="font-medium text-text-muted text-sm">{h.day}</span>
                  <span className={`font-semibold text-sm ${h.isClosed ? 'text-badge' : 'text-text-main'}`}>
                    {h.isClosed ? 'Închis' : `${h.open} – ${h.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="rounded-2xl overflow-hidden border border-border shadow-sm min-h-[300px] lg:min-h-0"
          >
            <iframe
              title="Google Maps - Lucky Pet Shop"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapData.address)}&output=embed`}
              className="w-full h-full min-h-[300px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
