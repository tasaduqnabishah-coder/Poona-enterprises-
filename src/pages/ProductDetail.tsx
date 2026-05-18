import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../sanity/client';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/layout/SEO';
import { 
  ArrowLeft, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Share2, 
  Star, 
  Info,
  Calendar,
  Sparkles,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import type { Product } from '../components/ui/ProductCard';

interface Specification {
  label: string;
  value: string;
}

interface ProductDetailData extends Product {
  galleryUrls?: string[];
  specifications?: Specification[];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  
  // Interactive Rental Calculator States
  const [selectedTenure, setSelectedTenure] = useState<number>(6); // Default to 6 Months (best rate)
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const query = `*[_type == "product" && _id == $id][0] {
          _id,
          title,
          price,
          rentalPrices,
          category,
          type,
          "imageUrl": image.asset->url,
          "galleryUrls": gallery[].asset->url,
          specifications,
          description
        }`;
        
        const data = await client.fetch(query, { id });
        if (data) {
          const formattedProduct = {
            id: data._id,
            title: data.title,
            price: data.price,
            rentalPrices: data.rentalPrices,
            category: data.category,
            type: data.type,
            imageUrl: data.imageUrl,
            galleryUrls: data.galleryUrls || [],
            specifications: data.specifications || [],
            description: data.description
          };
          setProduct(formattedProduct);
          setActiveImage(formattedProduct.imageUrl);
          
          // Set default tenure based on what's available
          if (data.rentalPrices) {
            const keys = ['sixMonths', 'threeMonths', 'oneMonth'];
            for (const key of keys) {
              if (data.rentalPrices[key]) {
                setSelectedTenure(key === 'sixMonths' ? 6 : key === 'threeMonths' ? 3 : 1);
                break;
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
          <p className="text-xs text-slate-500 font-medium">Loading premium details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 bg-slate-50/50">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Product Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">The product you are looking for does not exist, or the link may have expired.</p>
        <Link to="/products" className="bg-slate-900 text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-950/10">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const isRent = product.type === 'rent';
  const allImages = [product.imageUrl, ...(product.galleryUrls || [])].filter(Boolean);

  // Mapped pricing keys for calculation
  const getTenurePrice = (months: number): number => {
    if (!product.rentalPrices) return product.price || 0;
    switch (months) {
      case 1: return product.rentalPrices.oneMonth || product.price || 0;
      case 2: return product.rentalPrices.twoMonths || product.price || 0;
      case 3: return product.rentalPrices.threeMonths || product.price || 0;
      case 4: return product.rentalPrices.fourMonths || product.price || 0;
      case 5: return product.rentalPrices.fiveMonths || product.price || 0;
      case 6: return product.rentalPrices.sixMonths || product.price || 0;
      default: return product.price || 0;
    }
  };

  const currentMonthlyPrice = getTenurePrice(selectedTenure);

  // Share handler
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // WhatsApp Message Logic
  const formattedSpecs = product.specifications && product.specifications.length > 0
    ? product.specifications.map(s => `- ${s.label}: ${s.value}`).join('\n')
    : '';

  const whatsappMessage = isRent 
    ? `Hi Poona Enterprises, I am interested in renting:
Product: ${product.title}
Category: ${product.category}
Selected Tenure: ${selectedTenure} Month(s)
Monthly Rate: ₹${currentMonthlyPrice}/mo
${formattedSpecs ? `\nSpecifications:\n${formattedSpecs}` : ''}

Please let me know the availability and ordering process.`
    : `Hi Poona Enterprises, I am interested in buying:
Product: ${product.title}
Category: ${product.category}
Price: ₹${product.price}
${formattedSpecs ? `\nSpecifications:\n${formattedSpecs}` : ''}

Please share details about availability and delivery.`;

  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917875294904";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Splitting Description by Newlines for bullets ("About this item")
  const descBullets = product.description.split('\n').filter(line => line.trim().length > 0);

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-800 antialiased selection:bg-primary/10">
      <SEO 
        title={`${product.title} | Poona Enterprises`}
        description={product.description.substring(0, 150) + '...'}
        image={product.imageUrl}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Path */}
        <div className="mb-6 flex flex-wrap items-center text-xs font-semibold tracking-wider text-slate-500 uppercase">
          <Link to="/products" className="hover:text-slate-900 transition-colors flex items-center gap-1.5 py-1">
            <ArrowLeft size={13} /> Back to Catalog
          </Link>
          <span className="mx-2.5 text-slate-300">/</span>
          <span className="py-1">{product.category}</span>
          <span className="mx-2.5 text-slate-300">/</span>
          <span className="text-slate-900 font-bold py-1 truncate max-w-[200px] sm:max-w-none">{product.title}</span>
        </div>

        {/* Main Grid: Left (Images) & Right (Details) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-start">
          
          {/* ========================================================
              LEFT COLUMN: Amazon-style Gallery
              ======================================================== */}
          <div className="w-full lg:w-[48%] flex flex-col md:flex-row gap-4 lg:sticky lg:top-28">
            
            {/* Desktop Vertical Gallery Thumbnails (Left side on md+) */}
            {allImages.length > 1 && (
              <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onMouseEnter={() => setActiveImage(img)}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded border-2 overflow-hidden transition-all flex items-center justify-center bg-slate-50 ${
                      activeImage === img ? 'border-primary ring-2 ring-primary/20 opacity-100 scale-95' : 'border-slate-200/80 opacity-70 hover:opacity-100 hover:border-slate-400'
                    }`}
                  >
                    <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Main Image Display Box */}
            <div className="flex-grow aspect-[4/4.2] sm:aspect-square bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative group flex items-center justify-center p-6 shadow-sm hover:shadow-md transition-shadow">
              
              {/* Share Icon on main image */}
              <button 
                onClick={handleShare}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:shadow transition-all group-hover:scale-105 active:scale-95"
                title="Copy Product Link"
              >
                <Share2 size={16} className="text-slate-600" />
              </button>
              
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  src={activeImage} 
                  alt={product.title} 
                  className="w-full h-full object-contain max-h-[85%]"
                />
              </AnimatePresence>
              
              {/* Copy confirmation toast */}
              {copied && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full shadow-lg z-20">
                  Link Copied!
                </div>
              )}
            </div>
            
            {/* Mobile / Horizontal Scroll Thumbnails (Visible only on mobile) */}
            {allImages.length > 1 && (
              <div className="flex md:hidden gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 rounded border-2 flex-shrink-0 overflow-hidden bg-slate-50 ${
                      activeImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ========================================================
              RIGHT COLUMN: Product Info & SaaS Pricing Calculator
              ======================================================== */}
          <div className="w-full lg:w-[52%] flex flex-col">
            
            {/* Title Block */}
            <div className="border-b border-slate-100 pb-5 mb-5">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-150 px-2.5 py-1 rounded text-slate-600 border border-slate-200">
                  {product.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2.5 py-1 rounded border border-primary/10">
                  {isRent ? 'For Rent' : 'For Sale'}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug mb-3">
                {product.title}
              </h1>
              
              {/* Ratings and Reviews Header (Premium Mock) */}
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded font-bold text-xs border border-amber-200">
                  <span>4.2</span>
                  <Star size={12} fill="currentColor" />
                </div>
                <span>•</span>
                <span className="underline hover:text-primary cursor-pointer transition-colors font-medium">148 Customer Enquiries</span>
                <span>•</span>
                <span className="text-slate-400 font-medium">Wadgaon Sheri Verified</span>
              </div>
            </div>

            {/* Pricing Panel */}
            <div className="mb-6 bg-slate-50/50 rounded-2xl p-5 border border-slate-150 relative">
              
              {!isRent ? (
                // Sale Item Price Layout
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-extrabold text-slate-900">₹{product.price}</span>
                    {product.price && (
                      <span className="text-sm text-slate-400 line-through">₹{Math.round(product.price * 1.35)}</span>
                    )}
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">-35% OFF</span>
                  </div>
                  <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase mb-4">Inclusive of all taxes</p>
                  
                  {/* Delivery details */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200/80 text-xs text-slate-600">
                    <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Free Delivery & Installation inside Pune area.</span>
                  </div>
                </div>
              ) : (
                // Interactive Rent Price Calculator
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Selected Rate</p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-extrabold text-slate-900">₹{currentMonthlyPrice}</span>
                        <span className="text-sm text-slate-500 font-medium">/ month</span>
                      </div>
                    </div>
                    <div className="bg-primary/5 text-primary border border-primary/10 rounded-xl px-4 py-2 text-right">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Total Contract Rent</p>
                      <p className="text-base font-bold">₹{currentMonthlyPrice * selectedTenure}</p>
                    </div>
                  </div>

                  {/* Amazon style EMI offers list */}
                  <p className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-500" />
                    Select Rental Duration (Tenor)
                  </p>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
                    {[1, 2, 3, 4, 5, 6].map((months) => {
                      const hasPrice = getTenurePrice(months) > 0;
                      return (
                        <button
                          key={months}
                          disabled={!hasPrice}
                          onClick={() => setSelectedTenure(months)}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
                            selectedTenure === months
                              ? 'border-primary bg-primary/5 ring-1 ring-primary'
                              : 'border-slate-200 bg-white hover:border-slate-400'
                          }`}
                        >
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{months} Mo</span>
                          <span className="text-xs font-extrabold text-slate-900 mt-1">₹{getTenurePrice(months)}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive Terms Notice */}
                  <div className="bg-white rounded-xl p-3 border border-slate-200/80 text-xs text-slate-600 space-y-2">
                    <div className="flex gap-2">
                      <Truck className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <div>
                        {selectedTenure < 6 ? (
                          <p>
                            Short-term Rental: <strong className="text-slate-900">Pickup charges are applicable</strong> on customer side at return.
                          </p>
                        ) : (
                          <p className="text-emerald-700 font-medium">
                            ★ Long-term Deal: <strong className="text-emerald-800">Free return transportation</strong> is on us at end of tenure!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button Box */}
            <div className="mb-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-6 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg shadow-green-600/10 hover:-translate-y-0.5"
              >
                Instant Order & Book via WhatsApp <ArrowRight size={16} />
              </a>
            </div>

            {/* Amazon-style Bullet Specifications Grid */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border-t border-slate-100 pt-6 mb-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Technical Details</h3>
                <div className="bg-slate-50/50 rounded-xl border border-slate-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr 
                          key={index}
                          className={`border-b border-slate-100 last:border-0 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'
                          }`}
                        >
                          <td className="w-2/5 p-3.5 font-bold text-slate-500 text-xs uppercase tracking-wider border-r border-slate-100">
                            {spec.label}
                          </td>
                          <td className="w-3/5 p-3.5 font-semibold text-slate-900 text-xs">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* "About this Item" / Product Description Section */}
            <div className="border-t border-slate-100 pt-6 mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">About this item</h3>
              
              {/* Bulleted list format if descriptions have line breaks */}
              {descBullets.length > 1 ? (
                <ul className="list-disc pl-5 space-y-3.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {descBullets.map((bullet, index) => (
                    <li key={index} className="pl-1">
                      {bullet.replace(/^[-*•]\s*/, '')} {/* Remove any pre-existing list character prefix */}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50/20 p-4 rounded-xl border border-slate-100">
                  <p>{product.description}</p>
                </div>
              )}
            </div>

            {/* Bottom Quality Promise Badges */}
            <div className="border-t border-slate-100 pt-6 flex flex-wrap gap-4 items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                <ShieldCheck size={16} className="text-slate-400" />
                <span>1 Year Warranty Care</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                <RefreshCw size={16} className="text-slate-400" />
                <span>10 Days Replacement</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                <Clock size={16} className="text-slate-400" />
                <span>Quick Pune Delivery</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
