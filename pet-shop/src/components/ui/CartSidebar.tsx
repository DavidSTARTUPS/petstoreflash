import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CartItem } from '../../data/storeConfig';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onToggleSub: (id: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen, onClose, items, onRemove, onUpdateQty, onToggleSub,
}) => {
  // Lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const getItemPrice = (item: CartItem) => {
    if (item.isSubscription && item.product.subscriptionDiscount) {
      return item.product.price * (1 - item.product.subscriptionDiscount / 100);
    }
    return item.product.price;
  };

  const total = items.reduce((sum, item) => sum + getItemPrice(item) * item.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[70] w-full sm:w-[420px] bg-surface shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-bold text-text-main font-heading">
                Coșul tău
                {items.length > 0 && (
                  <span className="text-text-muted font-body text-sm font-medium ml-2">
                    ({items.reduce((s, i) => s + i.qty, 0)} produse)
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-text-muted hover:text-text-main transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Închide coșul"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mb-5">
                    <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="font-bold text-text-main text-lg mb-1">Coșul este gol</p>
                  <p className="text-text-muted text-sm mb-6">Adaugă produse pentru a continua</p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm min-h-[44px] hover:bg-primary-hover transition-colors"
                  >
                    Înapoi la Produse
                  </motion.button>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => {
                    const unitPrice = getItemPrice(item);
                    return (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        className="flex gap-3 bg-background rounded-xl p-3 border border-border"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-text-main line-clamp-1">{item.product.name}</h4>
                          <p className="text-[11px] text-text-muted mb-1">{item.product.weight}</p>

                          {/* Subscription indicator */}
                          {item.isSubscription && (
                            <span className="inline-flex items-center text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full mb-1">
                              🔄 −{item.product.subscriptionDiscount}%
                            </span>
                          )}

                          {/* Subscription toggle in cart */}
                          {item.product.isSubscriptionEligible && (
                            <button
                              onClick={() => onToggleSub(item.product.id)}
                              className="text-[11px] text-primary font-semibold hover:underline min-h-[32px] flex items-center"
                            >
                              {item.isSubscription ? 'Cumpărare unică' : 'Activează abonament'}
                            </button>
                          )}

                          <div className="flex items-center justify-between mt-1.5">
                            {/* Qty Controls */}
                            <div className="flex items-center border border-border rounded-lg overflow-hidden">
                              <button
                                onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                                className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-surface-alt transition-colors text-base font-bold min-h-[44px] min-w-[36px]"
                                aria-label="Scade cantitatea"
                              >
                                −
                              </button>
                              <span className="w-8 text-center text-sm font-bold text-text-main select-none">{item.qty}</span>
                              <button
                                onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                                className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-surface-alt transition-colors text-base font-bold min-h-[44px] min-w-[36px]"
                                aria-label="Crește cantitatea"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-sm text-text-main whitespace-nowrap">
                              {(unitPrice * item.qty).toFixed(2)} RON
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemove(item.product.id)}
                          className="self-start p-1 text-text-muted hover:text-badge transition-colors min-h-[44px] min-w-[32px] flex items-center justify-center"
                          aria-label="Șterge produsul"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Checkout Footer (sticky) */}
            {items.length > 0 && (
              <div className="p-5 border-t border-border bg-surface space-y-4">
                {items.some(i => i.isSubscription) && (
                  <div className="bg-primary-light rounded-lg p-3 text-sm text-primary font-medium flex items-center gap-2">
                    <span>🔄</span>
                    <span>Abonamentele se reînnoiesc lunar. Anulezi oricând.</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-text-muted font-medium">Total</span>
                  <span className="text-2xl font-extrabold text-text-main tracking-tight">{total.toFixed(2)} RON</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.01 }}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-base transition-colors min-h-[44px] shadow-sm"
                >
                  Finalizează Comanda
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
