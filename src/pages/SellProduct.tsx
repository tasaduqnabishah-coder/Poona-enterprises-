import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/layout/SEO';
import { ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { getWhatsAppLink } from '../lib/config';

export default function SellProduct() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    productName: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi, I want to sell my ${formData.productName}. My name is ${formData.name}, contact: ${formData.phone}.\n\nDetails: ${formData.description}`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-40 pb-20 bg-white min-h-screen">
      <SEO 
        title="Sell Your Product | Poona Enterprises" 
        description="Want to sell your used electronics or furniture? Get the best market price in Pune. Fill out our form and we'll contact you."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight mb-8">
            Sell to Us<span className="text-primary italic">.</span>
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed italic">
            "Got premium used electronics or designer furniture? Get a fair valuation and instant cash payout today."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100">
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8 italic">Why choose Poona?</h3>
              <ul className="space-y-6">
                {[
                  "Best Market Valuation",
                  "Instant Spot Cash Payout",
                  "Professional Home Pickup",
                  "Zero Hassle Documentation"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-sm font-bold text-slate-600 uppercase tracking-widest">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <CheckCircle2 size={14} className="text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-slate-900 p-12 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200">
              <RefreshCw size={40} className="mb-8 text-primary" />
              <h3 className="text-3xl font-serif font-bold mb-4 italic">Ready to Upgrade?</h3>
              <p className="text-slate-300 font-light leading-relaxed text-lg">
                We accept major brands of ACs, Washing Machines, Fridges, and Home Furniture.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-5 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-slate-900 font-serif"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Phone Number</label>
                  <input 
                    type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-5 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-slate-900 font-serif"
                    placeholder="+91"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Product Details</label>
                <input 
                  type="text" name="productName" required value={formData.productName} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-5 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-slate-900 font-serif text-xl"
                  placeholder="e.g. Samsung 1.5 Ton AC / Leather Sofa"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Condition & Notes</label>
                <textarea 
                  name="description" required rows={4} value={formData.description} onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-5 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-slate-900 font-serif resize-none"
                  placeholder="Age, condition, and any specific details..."
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-primary text-white font-bold uppercase tracking-[0.3em] text-[10px] py-6 rounded-xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-4 group"
              >
                Request Instant Valuation <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
