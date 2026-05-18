import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Product {
  id?: string;
  title: string;
  price?: number;
  rentalPrices?: {
    oneMonth?: number;
    twoMonths?: number;
    threeMonths?: number;
    fourMonths?: number;
    fiveMonths?: number;
    sixMonths?: number;
  };
  category: 'electronics' | 'furniture';
  type: 'rent' | 'sale';
  imageUrl: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isRent = product.type === 'rent';
  
  const rentPricing = product.rentalPrices ? `
Pricing Breakdown:
1 Month: ₹${product.rentalPrices.oneMonth || product.price || 'N/A'}/mo
2 Months: ₹${product.rentalPrices.twoMonths || 'N/A'}/mo
3 Months: ₹${product.rentalPrices.threeMonths || 'N/A'}/mo
4 Months: ₹${product.rentalPrices.fourMonths || 'N/A'}/mo
5 Months: ₹${product.rentalPrices.fiveMonths || 'N/A'}/mo
6 Months: ₹${product.rentalPrices.sixMonths || 'N/A'}/mo
` : `Price: ₹${product.price}/mo`;

  const whatsappMessage = isRent 
    ? `Hi, I'm interested in renting:
Product: ${product.title}
${rentPricing.trim()}
Details: ${product.description}
Rent Duration: [Specify 1-6 Months]

Please share more details.`
    : `Hi, I'm interested in buying:
Product: ${product.title}
Price: ₹${product.price}
Details: ${product.description}

Please share more details.`;
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "917875294904";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col h-full bg-white transition-all duration-300"
    >
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-50 mb-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-slate-100">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{product.category}</p>
          </div>
        </div>

        {/* Action Button - Reveal on Hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="bg-white text-slate-900 px-6 py-3 rounded shadow-xl font-bold uppercase tracking-widest text-[10px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
            <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight">
              {product.title}
            </h3>
          </Link>
          <p className="font-bold text-slate-900">
            {isRent ? (
              <span className="text-sm">View Rates</span>
            ) : (
              <>₹{product.price}</>
            )}
          </p>
        </div>
        
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>

        {isRent && (
          <div className="mb-4 bg-slate-50 rounded border border-slate-100 p-2">
            <p className="text-[10px] font-bold text-slate-700 mb-2 uppercase tracking-wider text-center">Monthly Rates</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[8px] text-slate-500">1 Mo</p>
                <p className="text-xs font-bold text-slate-900">{product.rentalPrices?.oneMonth ? `₹${product.rentalPrices.oneMonth}` : (product.price ? `₹${product.price}` : '-')}</p>
              </div>
              <div>
                <p className="text-[8px] text-slate-500">2 Mo</p>
                <p className="text-xs font-bold text-slate-900">{product.rentalPrices?.twoMonths ? `₹${product.rentalPrices.twoMonths}` : '-'}</p>
              </div>
              <div>
                <p className="text-[8px] text-slate-500">3 Mo</p>
                <p className="text-xs font-bold text-slate-900">{product.rentalPrices?.threeMonths ? `₹${product.rentalPrices.threeMonths}` : '-'}</p>
              </div>
              <div>
                <p className="text-[8px] text-slate-500">4 Mo</p>
                <p className="text-xs font-bold text-slate-900">{product.rentalPrices?.fourMonths ? `₹${product.rentalPrices.fourMonths}` : '-'}</p>
              </div>
              <div>
                <p className="text-[8px] text-slate-500">5 Mo</p>
                <p className="text-xs font-bold text-slate-900">{product.rentalPrices?.fiveMonths ? `₹${product.rentalPrices.fiveMonths}` : '-'}</p>
              </div>
              <div>
                <p className="text-[8px] text-slate-500">6 Mo</p>
                <p className="text-xs font-bold text-slate-900">{product.rentalPrices?.sixMonths ? `₹${product.rentalPrices.sixMonths}` : '-'}</p>
              </div>
            </div>
          </div>
        )}

        {isRent && (
          <div className="mb-4 bg-slate-50 p-2.5 rounded border border-slate-100">
            <p className="text-[9px] text-slate-500 leading-relaxed italic">
              <span className="font-bold text-slate-700 not-italic">Note:</span> Pickup charges apply for short-term rentals. For long-term (min. 6 months), return transportation is on us.
            </p>
          </div>
        )}
        
        <div className="mt-auto pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-3 transition-all"
          >
            Book via WhatsApp <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
