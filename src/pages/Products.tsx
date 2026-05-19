import { useEffect, useState } from 'react';
import { client } from '../sanity/client';
import ProductCard from '../components/ui/ProductCard';
import type { Product } from '../components/ui/ProductCard';
import { motion } from 'framer-motion';
import SEO from '../components/layout/SEO';
import { ProductSkeleton } from '../components/ui/Skeleton';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'electronics' | 'furniture'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'rent' | 'sale'>('rent');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let query = `*[_type == "product"]`;
        if (categoryFilter !== 'all' || typeFilter !== 'all') {
          const conditions = [];
          if (categoryFilter !== 'all') conditions.push(`category == "${categoryFilter}"`);
          if (typeFilter !== 'all') conditions.push(`type == "${typeFilter}"`);
          query = `*[_type == "product" && ${conditions.join(' && ')}]`;
        }
        query += ` | order(createdAt desc) {
          _id,
          title,
          price,
          rentalPrices,
          category,
          type,
          "imageUrl": image.asset->url,
          description
        }`;

        const data = await client.fetch(query);
        setProducts(data.map((p: any) => ({
          id: p._id,
          title: p.title,
          price: p.price,
          rentalPrices: p.rentalPrices,
          category: p.category,
          type: p.type,
          imageUrl: p.imageUrl,
          description: p.description
        })));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter, typeFilter]);

  return (
    <div className="pt-40 pb-20 bg-white min-h-screen">
      <SEO
        title="Our Collection | Poona Enterprises"
        description="Browse our wide range of high-quality electronics and furniture available for rent and sale in Pune."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
            The Collection
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Thoughtfully selected pieces for a refined home. Filter by category to find your perfect match.
          </p>
        </div>

        {/* Minimal Filter Bar */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-20">
          <div className="flex items-center gap-4 bg-slate-50 p-1 rounded-lg border border-slate-100">
            {['all', 'electronics', 'furniture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat as any)}
                className={cn(
                  "px-6 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all",
                  categoryFilter === cat
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-slate-200 hidden md:block" />

          <div className="flex items-center gap-4 bg-slate-50 p-1 rounded-lg border border-slate-100">
            {['all', 'rent', 'sale'].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t as any)}
                className={cn(
                  "px-6 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all",
                  typeFilter === t
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {loading ? (
            Array(8).fill(0).map((_, i) => <ProductSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center border-t border-slate-100"
            >
              <div className="flex flex-col items-center gap-6">
                <Search size={32} className="text-slate-200" />
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-2 text-slate-900">No items found</h3>
                  <p className="text-slate-500 mb-8">Try adjusting your filters to find what you're looking for.</p>
                  <button
                    onClick={() => { setCategoryFilter('all'); setTypeFilter('rent'); }}
                    className="text-primary font-bold uppercase tracking-widest text-[10px] hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
