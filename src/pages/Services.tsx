import { motion } from 'framer-motion';
import { 
  Wrench, 
  RefreshCw, 
  Sofa,
  Laptop,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/layout/SEO';

const services = [
  {
    title: "Appliance Rentals",
    description: "Premium refrigerators, washing machines, and air conditioners on flexible monthly plans. Includes free installation and full doorstep maintenance.",
    icon: Laptop,
    features: ["Free Installation", "24h Service", "Upgradable Plans"],
    color: "bg-slate-50 text-slate-900"
  },
  {
    title: "Furniture Rentals",
    description: "Designer sofas, ergonomic beds, and complete home packages to elevate your living space. zero deposit options available for select plans.",
    icon: Sofa,
    features: ["Zero Deposit*", "Pristine Quality", "Easy Returns"],
    color: "bg-slate-50 text-slate-900"
  },
  {
    title: "Expert Repair Services",
    description: "Certified technicians for all major household brands. We provide fast, reliable, and guaranteed repairs for ACs, Fridges, and more.",
    icon: Wrench,
    features: ["Genuine Parts", "Same-Day Response", "Warranty Provided"],
    color: "bg-slate-50 text-slate-900"
  },
  {
    title: "Buy & Sell Assets",
    description: "Ready for an upgrade? We buy your used furniture and electronics at competitive market prices with instant spot-cash payouts.",
    icon: RefreshCw,
    features: ["Instant Quote", "Spot Cash", "Zero Hassle"],
    color: "bg-slate-50 text-slate-900"
  }
];

export default function Services() {
  return (
    <div className="pt-40 pb-20 bg-white min-h-screen">
      <SEO 
        title="Our Services | Poona Enterprises" 
        description="Pune's complete household solution. Renting, Buying, Selling, and Repairing furniture and electronics."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight mb-8">
            Our Expertise<span className="text-primary italic">.</span>
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed italic">
            "Providing Pune with reliable household solutions for over 15 years. Quality, speed, and integrity in every service we offer."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-12 rounded-[2.5rem] bg-white border border-slate-100 hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="flex flex-col gap-10">
                <div className={cn("p-6 rounded-2xl w-fit h-fit shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2", service.color)}>
                  <service.icon size={40} />
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold mb-6 text-slate-900">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-10 font-light italic text-lg">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    {service.features.map(feature => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="bg-primary/10 p-1 rounded-full">
                          <CheckCircle2 size={12} className="text-primary" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`https://wa.me/917875294904?text=${encodeURIComponent(`Hi, I'm interested in your ${service.title} service.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-primary shadow-xl shadow-slate-200"
                  >
                    Enquire via WhatsApp <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
