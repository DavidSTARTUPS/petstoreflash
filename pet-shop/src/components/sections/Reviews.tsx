import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { StarRating } from '../ui/StarRating';
import type { Review } from '../../data/storeConfig';

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="reviews" ref={ref} className="bg-surface-alt py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-main font-heading tracking-tight mb-2">
            Ce Spun Clienții Noștri
          </h2>
          <p className="text-text-muted text-sm sm:text-base">Recenzii reale de pe Google Maps</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((review, i) => (
            <motion.blockquote
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 + 0.15, duration: 0.35 }}
              className="bg-surface rounded-2xl p-5 sm:p-6 border border-border shadow-sm flex flex-col"
            >
              <StarRating rating={review.rating} size="sm" />

              <p className="text-text-body text-sm sm:text-base leading-relaxed flex-1 mt-4 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-4 pt-3 border-t border-border/60">
                <p className="font-bold text-sm text-text-main">{review.author}</p>
                <p className="text-[11px] text-text-muted">Recenzie Google</p>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};
