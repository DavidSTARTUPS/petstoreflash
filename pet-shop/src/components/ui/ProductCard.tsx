import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../../data/storeConfig';

interface ProductCardProps {
  product: Product;
  index: number;
  onAdd: (product: Product, isSubscription: boolean) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, onAdd }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const [wantsSub, setWantsSub] = useState(false);

  const handleAdd = () => {
    onAdd(product, wantsSub);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const subPrice = product.subscriptionDiscount
    ? product.price * (1 - product.subscriptionDiscount / 100)
    : product.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      className="group flex flex-col bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* ── Image ── */}
      <div className="relative aspect-square overflow-hidden bg-background">
        {!imgLoaded && <div className="absolute inset-0 bg-border/40 animate-pulse" />}
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {product.isSubscriptionEligible && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm">
            −{product.subscriptionDiscount}%
          </span>
        )}
        <span className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-surface/90 backdrop-blur-sm text-text-muted text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-border">
          {product.category}
        </span>
      </div>

      {/* ── Info ── */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <p className="text-[10px] sm:text-[11px] text-text-muted font-medium uppercase tracking-widest mb-1">
          {product.weight}
        </p>
        <h3 className="text-sm sm:text-base font-bold text-text-main leading-snug mb-2 sm:mb-3 line-clamp-2 font-heading">
          {product.name}
        </h3>

        {/* ── Subscription Toggle — hidden on small screens, shown on sm+ ── */}
        {product.isSubscriptionEligible && (
          <label className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 cursor-pointer min-h-[44px] select-none">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                checked={wantsSub}
                onChange={() => setWantsSub(!wantsSub)}
                className="sr-only peer"
              />
              <div className="w-9 h-[22px] sm:w-10 sm:h-6 bg-border rounded-full peer-checked:bg-primary transition-colors" />
              <div className="absolute top-[3px] left-[3px] w-4 h-4 sm:w-5 sm:h-5 sm:top-0.5 sm:left-0.5 bg-surface rounded-full shadow-sm transition-transform peer-checked:translate-x-[14px] sm:peer-checked:translate-x-4" />
            </div>
            <span className="text-xs sm:text-sm text-text-body font-medium leading-tight">
              <span className="text-primary font-bold">−{product.subscriptionDiscount}%</span>
              <span className="hidden sm:inline"> Abonament</span>
            </span>
          </label>
        )}

        {/* ── Price + CTA (pinned to bottom) ── */}
        <div className="mt-auto pt-3 sm:pt-4 border-t border-border/60">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              {wantsSub && product.subscriptionDiscount ? (
                <>
                  <span className="block text-xs text-text-muted line-through">{product.price.toFixed(2)}</span>
                  <span className="font-extrabold text-lg sm:text-2xl text-primary tracking-tight">
                    {subPrice.toFixed(2)}
                    <span className="text-[10px] sm:text-sm text-text-muted font-medium ml-0.5"> RON</span>
                  </span>
                </>
              ) : (
                <span className="font-extrabold text-lg sm:text-2xl text-text-main tracking-tight">
                  {product.price.toFixed(2)}
                  <span className="text-[10px] sm:text-sm text-text-muted font-medium ml-0.5"> RON</span>
                </span>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleAdd}
              disabled={added}
              className={`flex-shrink-0 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 shadow-sm ${
                added
                  ? 'bg-success/10 text-success border border-success/20'
                  : 'bg-primary hover:bg-primary-hover text-white'
              }`}
            >
              {added ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden sm:inline">Adaugă</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
