import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { STORE_PHONE, STORE_PHONE_RAW } from '../../data/storeConfig';

const NAV_ITEMS = [
  { label: 'Produse', href: '#products' },
  { label: 'Recenzii', href: '#reviews' },
  { label: 'Program', href: '#visit' },
];

const PawIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3.5-1c.83 0 1.5-.67 1.5-1.5S9.33 6 8.5 6 7 6.67 7 7.5 7.67 9 8.5 9zm7 0c.83 0 1.5-.67 1.5-1.5S16.33 6 15.5 6 14 6.67 14 7.5 14.67 9 15.5 9zM6 11.5c0 .83.67 1.5 1.5 1.5S9 12.33 9 11.5 8.33 10 7.5 10 6 10.67 6 11.5zm12 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM12 16c-2.21 0-4-1.79-4-4h-.5C7.22 12 7 12.22 7 12.5c0 2.76 2.24 5 5 5s5-2.24 5-5c0-.28-.22-.5-.5-.5H16c0 2.21-1.79 4-4 4z"/>
  </svg>
);

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Portal-rendered mobile drawer to avoid sticky clipping
  const mobileDrawer = createPortal(
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-[90] w-[85%] max-w-sm bg-surface shadow-2xl flex flex-col lg:hidden"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <PawIcon />
                </div>
                <span className="text-lg font-bold text-primary font-heading">Lucky Pet Shop</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 text-text-muted hover:text-text-main min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                aria-label="Închide meniul"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                  className="flex items-center px-4 py-4 text-base font-semibold text-text-main hover:bg-primary-light hover:text-primary rounded-xl min-h-[44px] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Phone CTA */}
            <div className="p-5 border-t border-border">
              <a
                href={`tel:${STORE_PHONE_RAW}`}
                className="flex items-center justify-center gap-2 w-full bg-primary text-white py-4 rounded-xl font-bold text-base min-h-[44px] hover:bg-primary-hover transition-colors active:scale-[0.97]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Sună: {STORE_PHONE}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-border'
            : 'bg-surface border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-[72px]">
            {/* Mobile Hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-text-main hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Deschide meniul"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <a href="/" className="flex items-center gap-2 min-h-[44px] px-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <PawIcon />
              </div>
              <span className="text-lg sm:text-xl font-bold text-primary font-heading tracking-tight">
                Lucky Pet Shop
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex flex-1 justify-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-text-body hover:text-primary hover:bg-primary-light px-4 py-2 rounded-lg min-h-[44px] flex items-center text-sm font-semibold transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right: Phone CTA + Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={`tel:${STORE_PHONE_RAW}`}
                className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary bg-primary-light hover:bg-primary hover:text-white px-4 py-2.5 rounded-xl transition-all duration-200 min-h-[44px]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {STORE_PHONE}
              </a>

              <button
                onClick={onCartClick}
                className="relative p-2 text-text-main hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center group"
                aria-label="Coș de cumpărături"
              >
                <svg className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0 -right-0.5 inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-badge rounded-full shadow-sm"
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Render menu drawer into body via portal — avoids sticky clipping bug */}
      {mobileDrawer}
    </>
  );
};
