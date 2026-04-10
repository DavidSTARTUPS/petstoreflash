import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { TrustBar } from './components/sections/TrustBar';
import { ProductGrid } from './components/sections/ProductGrid';
import { Reviews } from './components/sections/Reviews';
import { VisitUs } from './components/sections/VisitUs';
import { CartSidebar } from './components/ui/CartSidebar';
import { MobileBottomBar } from './components/ui/MobileBottomBar';
import { MAPS_DATA, PRODUCTS, REVIEWS } from './data/storeConfig';
import type { Product, CartItem } from './data/storeConfig';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, isSubscription: boolean) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1, isSubscription } : i
        );
      }
      return [...prev, { product, qty: 1, isSubscription }];
    });
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((i) => i.product.id !== id));

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty } : i)));
  };

  const toggleSubscription = (id: string) => {
    setCart((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, isSubscription: !i.isSubscription } : i))
    );
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => {
    const price = i.isSubscription && i.product.subscriptionDiscount
      ? i.product.price * (1 - i.product.subscriptionDiscount / 100)
      : i.product.price;
    return sum + price * i.qty;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen font-body antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <Hero />
        <TrustBar />
        <ProductGrid products={PRODUCTS} onAddToCart={addToCart} />
        <Reviews reviews={REVIEWS} />
        <VisitUs mapData={MAPS_DATA} />
      </main>

      <Footer />
      <MobileBottomBar cartCount={cartCount} cartTotal={cartTotal} onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onToggleSub={toggleSubscription}
      />
    </div>
  );
}
