import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface Product {
  id?: string;
  title: string;
  price: number;
  category: 'electronics' | 'furniture';
  type: 'rent' | 'sale';
  imageUrl: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappMessage = `Hi, I'm interested in ${product.title} (${product.type}). Please share details.`;
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
          <a
            href={whatsappUrl}
            target="_blank"
            className="bg-white text-slate-900 px-6 py-3 rounded shadow-xl font-bold uppercase tracking-widest text-[10px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Enquire Now
          </a>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight">
            {product.title}
          </h3>
          <p className="font-bold text-slate-900">
            ₹{product.price}<span className="text-[10px] font-normal text-slate-400 ml-1">{product.type === 'rent' ? '/mo' : ''}</span>
          </p>
        </div>
        
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>
        
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
