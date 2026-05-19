import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanity/client';
import ProductCard from '../components/ui/ProductCard';
import type { Product } from '../components/ui/ProductCard';
import { motion } from 'framer-motion';
import SEO from '../components/layout/SEO';
import { ProductSkeleton } from '../components/ui/Skeleton';
import { Search, ArrowLeft, ArrowUpDown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'electronics' | 'furniture'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'rent' | 'sale'>('rent');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'priceLowToHigh' | 'priceHighToLow'>('default');

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

  // Client-side filtering & sorting
  const filteredAndSortedProducts = products
    .filter((product) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        product.title.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'priceLowToHigh') {
        const priceA = a.type === 'rent' ? (a.rentalPrices?.oneMonth || a.price || 0) : (a.price || 0);
        const priceB = b.type === 'rent' ? (b.rentalPrices?.oneMonth || b.price || 0) : (b.price || 0);
        return priceA - priceB;
      }
      if (sortBy === 'priceHighToLow') {
        const priceA = a.type === 'rent' ? (a.rentalPrices?.oneMonth || a.price || 0) : (a.price || 0);
        const priceB = b.type === 'rent' ? (b.rentalPrices?.oneMonth || b.price || 0) : (b.price || 0);
        return priceB - priceA;
      }
      return 0; // Default
    });

  return (
    <div className="pt-40 pb-20 bg-white min-h-screen">
      <SEO
        title="Our Collection | Poona Enterprises"
        description="Browse our wide range of high-quality electronics and furniture available for rent and sale in Pune."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all duration-300 group cursor-pointer"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
            The Collection<span className="text-primary">.</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">
            Thoughtfully selected pieces for a refined home. Filter by category, search by term, or sort by price.
          </p>
        </div>

        {/* Modern Filter & Search Controls */}
        <div className="flex flex-col gap-6 mb-16 max-w-4xl mx-auto">
          {/* Search Bar Row */}
          <div className="relative w-full max-w-2xl mx-auto">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search products by title, features, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-16 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Categorization and Sorting Row */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mt-4">
            {/* Category / Type buttons group */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                {['all', 'electronics', 'furniture'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat as any)}
                    className={cn(
                      "px-5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer",
                      categoryFilter === cat
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="w-px h-6 bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                {['all', 'rent', 'sale'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t as any)}
                    className={cn(
                      "px-5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer",
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

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="sortBy" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sort By:</label>
              <div className="relative">
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 px-6 py-2.5 pr-10 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                >
                  <option value="default">Default: Recent</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <ArrowUpDown size={12} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {loading ? (
            Array(8).fill(0).map((_, i) => <ProductSkeleton key={i} />)
          ) : filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-24 text-center border-t border-slate-100"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="bg-slate-50 p-6 rounded-full">
                  <Search size={32} className="text-slate-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-2 text-slate-900">No items found</h3>
                  <p className="text-slate-500 mb-8 text-sm">Try adjusting your filters or search terms to find what you're looking for.</p>
                  <button
                    onClick={() => { setCategoryFilter('all'); setTypeFilter('all'); setSearchQuery(''); setSortBy('default'); }}
                    className="bg-slate-900 text-white hover:bg-primary px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[9px] transition-all cursor-pointer"
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
