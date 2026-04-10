import { motion } from 'framer-motion';
import { ProductCard } from '../ui/ProductCard';
import type { Product } from '../../data/storeConfig';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, isSubscription: boolean) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => (
  <section id="products" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-10 sm:mb-12">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-main font-heading tracking-tight mb-1.5"
        >
          Produsele Noastre
        </motion.h2>
        <p className="text-text-muted text-sm sm:text-base">Cele mai populare alegeri din magazin</p>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          index={i}
          onAdd={onAddToCart}
        />
      ))}
    </div>
  </section>
);
