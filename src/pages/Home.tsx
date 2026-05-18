import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Sofa,
  ArrowRight,
  ShieldCheck,
  Star,
  Zap,
  Truck,
  Phone,
  RefreshCw,
  Clock,
  MessageSquare
} from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import type { Product } from '../components/ui/ProductCard';
import { useEffect, useState } from 'react';
import { client } from '../sanity/client';
import SEO from '../components/layout/SEO';
import { ProductSkeleton } from '../components/ui/Skeleton';

const heroImage = "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=2000";

const coreServices = [
  {
    title: "Premium Renting",
    description: "Get the latest electronics and designer furniture on flexible monthly plans. zero commitment, maximum style.",
    icon: Sofa,
    link: "/products",
    badge: "Most Popular"
  },
  {
    title: "Buy & Sell",
    description: "Looking to upgrade or clear space? We buy your old assets at market price or offer certified pre-owned deals.",
    icon: RefreshCw,
    link: "/sell",
    badge: "Instant Cash"
  },
  {
    title: "Expert Repairs",
    description: "Our certified technicians fix everything from refrigerators to ACs and sofas. fast doorstep service.",
    icon: Wrench,
    link: "/services",
    badge: "24h Response"
  }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await client.fetch(`*[_type == "product"][0...4]{
          "id": _id,
          title,
          price,
          rentalPrices,
          category,
          type,
          "imageUrl": image.asset->url,
          description
        }`);
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#fafafa]">
      <SEO
        title="Poona Enterprises | Rent, Buy, Repair Furniture & Appliances"
        description="Pune's complete household solution. Rent premium furniture, buy/sell appliances, or get expert repairs. All in one place."
      />

      {/* Hero Section - Optimized for Mobile */}
      <section className="relative min-h-[100vh] lg:h-[95vh] flex items-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Premium Interior"
            className="w-full h-full object-cover grayscale-[0.1]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] mb-6 border border-white/20">
                <Zap size={10} className="text-yellow-400 fill-yellow-400" /> Serving Pune Since 2008
              </div>
              <h1 className="text-5xl md:text-8xl font-serif font-bold leading-[1.1] md:leading-[0.9] mb-6">
                Rent. Buy.<br className="hidden md:block" />
                Repair. Resell<span className="text-primary italic">.</span>
              </h1>
              <p className="text-lg md:text-2xl font-light opacity-90 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed italic">
                Experience the art of uncomplicated living with Pune's finest collection of furniture and appliances.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="bg-white text-slate-900 px-8 py-4 md:px-10 md:py-5 rounded-md font-bold uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all shadow-xl"
                >
                  Shop Inventory
                </Link>
                <Link
                  to="/services"
                  className="bg-primary text-white px-8 py-4 md:px-10 md:py-5 rounded-md font-bold uppercase tracking-widest text-[10px] hover:bg-primary-dark transition-all shadow-xl"
                >
                  Repair Service
                </Link>
              </div>
            </motion.div>

            {/* Quick Contact Card - Optimized for Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md mx-auto lg:ml-auto"
            >
              <div className="bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-2xl border border-white/20">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-slate-900 leading-tight">What do you need today?</h2>
                <div className="space-y-4 md:space-y-6">
                  <Link to="/products" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2.5 md:p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform"><Sofa size={18} className="text-primary" /></div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm md:text-base">Rent Essentials</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Starts @ ₹499/mo</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                  </Link>
                  <Link to="/sell" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2.5 md:p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform"><RefreshCw size={18} className="text-emerald-500" /></div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm md:text-base">Sell Old Assets</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Instant Cash Payout</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </Link>
                  <Link to="/services" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-2.5 md:p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform"><Wrench size={18} className="text-amber-500" /></div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm md:text-base">Book Repair</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Expert Technicians</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Services Section - Subtle Shades */}
      <section className="py-20 md:py-32 bg-[#fcfcfc] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 mb-6 italic">Complete household care<span className="text-primary">.</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
              We've spent 15 years perfecting the way you manage your home assets. Whether you need to rent for a month or fix for a lifetime, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {coreServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white p-8 md:p-12 rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                <div className="absolute -top-3 left-8 md:left-12 bg-primary text-white px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                  {service.badge}
                </div>
                <div className="bg-slate-50 p-5 md:p-6 rounded-2xl w-fit mb-6 md:mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                  <service.icon size={28} className="text-slate-900" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 md:mb-6 text-slate-900 leading-tight">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 md:mb-8 font-light italic text-sm md:text-base">
                  "{service.description}"
                </p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-3 text-slate-900 font-bold uppercase tracking-widest text-[9px] hover:text-primary transition-colors"
                >
                  Explore Service <ArrowRight size={12} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection - Appliances & Furniture Highlight */}
      <section className="py-20 md:py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Electronics & Furniture<br className="hidden md:block" />for every need<span className="text-primary italic">.</span></h2>
              <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed italic">
                From high-capacity refrigerators to designer leather sofas, browse our current certified inventory.
              </p>
            </div>
            <Link to="/products" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-[9px] hover:bg-slate-50 transition-all shadow-sm">
              View Entire Catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {loading ? (
              Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white border border-slate-100 rounded-2xl">
                <p className="text-slate-400">Our stock is updated daily. Check back in a few hours.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust & Efficiency - Highlighting Doorstep Service */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200"
                  alt="Repair Service"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stat Card - Optimized for Mobile */}
              <div className="absolute -bottom-6 right-0 md:-bottom-10 md:-right-10 bg-slate-900 text-white p-6 md:p-10 rounded-2xl shadow-2xl max-w-[200px] md:max-w-[280px]">
                <Clock className="text-primary mb-3 md:mb-4" size={24} />
                <p className="text-3xl md:text-4xl font-serif font-bold mb-1 md:mb-2">24h</p>
                <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Express Doorstep Response Time</p>
              </div>
            </div>
            <div className="pt-12 lg:pt-0">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                Hassle-free service,<br />
                at your doorstep.
              </h2>
              <div className="space-y-8 md:space-y-10">
                {[
                  { icon: ShieldCheck, title: "Certified Parts", desc: "We only use 100% genuine parts for all our appliance and furniture repairs." },
                  { icon: Truck, title: "Free Moving", desc: "Rental plans include professional pickup and delivery at no extra cost." },
                  { icon: Star, title: "15+ Years", desc: "Trust the experts who have served over 10,000 households in Pune." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 md:gap-6">
                    <div className="bg-[#fcfcfc] p-4 rounded-xl h-fit shadow-sm">
                      <item.icon className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-light italic leading-relaxed text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="mt-12 inline-block bg-slate-900 text-white px-8 py-4 md:px-10 md:py-5 rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                Connect with an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Optimized for Mobile */}
      <section className="py-12 md:py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-slate-100">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-8 italic">Your space, our commitment<span className="text-primary">.</span></h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <a href="tel:+917875294904" className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 md:px-10 md:py-5 rounded-lg font-bold uppercase tracking-widest text-[9px] hover:bg-slate-800 transition-all">
                <Phone size={14} /> Call Now
              </a>
              <a href="https://wa.me/917875294904" className="flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 md:px-10 md:py-5 rounded-lg font-bold uppercase tracking-widest text-[9px] hover:bg-primary-dark transition-all">
                <MessageSquare size={14} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
