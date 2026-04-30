import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { TrustBar } from './components/sections/TrustBar';
import { ProductGrid } from './components/sections/ProductGrid';
import { Reviews } from './components/sections/Reviews';
import { VisitUs } from './components/sections/VisitUs';
import { CartSidebar } from './components/ui/CartSidebar';
import { MobileBottomBar } from './components/ui/MobileBottomBar';
import { MAPS_DATA, REVIEWS } from './data/storeConfig';
import type { Product, CartItem } from './data/storeConfig';
import { supabase } from './lib/supabaseClient';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        console.log("[PetShop] Fetching products from:", import.meta.env.VITE_SUPABASE_URL);
        const { data, error } = await supabase
          .from('ecommerce_products')
          .select('*')
          .eq('in_stock', true);
        
        console.log("[PetShop] Data:", data);
        console.log("[PetShop] Error:", error);

        if (error) {
          console.error("[PetShop] Supabase Error:", error);
          return;
        }

        if (data) {
          console.log("[PetShop] Live Data Received:", data);
          const mapped: Product[] = data.map(item => ({
            id: item.id,
            name: item.name,
            price: Number(item.price),
            weight: item.weight || '',
            category: item.category || '',
            imageUrl: item.image_url || 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=600&fit=crop&q=80',
            isSubscriptionEligible: item.is_subscription,
            subscriptionDiscount: 10
          }));
          setLiveProducts(mapped);
        }
      } catch (err) {
        console.error("[PetShop] Critical Fetch Error:", err);
      }
    };

    fetchLiveProducts();
  }, []);

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
        <ProductGrid products={liveProducts} onAddToCart={addToCart} />
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
