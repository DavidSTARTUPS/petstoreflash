import { motion, AnimatePresence } from 'framer-motion';

interface MobileBottomBarProps {
  cartCount: number;
  cartTotal: number;
  onCartClick: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ cartCount, cartTotal, onCartClick }) => {
  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-surface border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.08)] safe-area-bottom"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">{cartCount} {cartCount === 1 ? 'produs' : 'produse'}</p>
                <p className="text-base font-extrabold text-text-main tracking-tight">{cartTotal.toFixed(2)} RON</p>
              </div>
            </div>
            <button
              onClick={onCartClick}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold text-sm min-h-[44px] min-w-[44px] transition-colors active:scale-[0.97] shadow-sm"
            >
              Vezi Coșul
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
