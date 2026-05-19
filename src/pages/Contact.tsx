import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import SEO from '../components/layout/SEO';
import { cn } from '../lib/utils';
import { BUSINESS_PHONE_DISPLAY, BUSINESS_EMAIL, getWhatsAppLink } from '../lib/config';

export default function Contact() {
  const contactDetails = [
    {
      title: "Our Studio",
      info: "Shop No. 1, Pruthvija Residency, Ground Floor, Old Mundhwa Road, Raghuveer Nagar, Wadgaon Sheri, Pune 411014",
      icon: MapPin,
      color: "bg-slate-50 text-slate-900"
    },
    {
      title: "Direct Line",
      info: BUSINESS_PHONE_DISPLAY,
      icon: Phone,
      color: "bg-slate-50 text-slate-900"
    },
    {
      title: "Opening Hours",
      info: "Mon - Sat: 9:00 AM - 8:00 PM",
      icon: Clock,
      color: "bg-slate-50 text-slate-900"
    },
    {
      title: "Email Inquiries",
      info: BUSINESS_EMAIL,
      icon: Mail,
      color: "bg-slate-50 text-slate-900"
    }
  ];

  return (
    <div className="pt-40 pb-20 bg-white min-h-screen">
      <SEO 
        title="Contact Us | Poona Enterprises" 
        description="Have questions? Contact Poona Enterprises for all your electronics and furniture rental needs in Pune. We are located in Wadgaon Sheri."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight mb-8">
            Contact Us<span className="text-primary italic">.</span>
          </h1>
          <p className="text-xl text-slate-500 font-light leading-relaxed italic">
            "We're here to help you curate your perfect space. Reach out to our Pune studio for rentals, repairs, or valuations."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className={cn("p-5 rounded-2xl w-fit mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500", detail.color)}>
                  <detail.icon size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 italic">{detail.title}</h3>
                <p className="text-slate-500 text-sm font-light leading-relaxed">{detail.info}</p>
              </motion.div>
            ))}
            
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              href={getWhatsAppLink("Hi, I would like to speak with an expert regarding your services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-full bg-slate-900 hover:bg-primary text-white p-12 rounded-[2.5rem] flex items-center justify-between group transition-all duration-500 shadow-2xl shadow-slate-200"
            >
              <div className="flex items-center gap-8">
                <div className="bg-white/10 p-5 rounded-2xl text-primary">
                  <MessageSquare size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold italic">Chat with an Expert</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Instant Response via WhatsApp</p>
                </div>
              </div>
              <div className="bg-white/10 p-4 rounded-full group-hover:translate-x-3 transition-transform">
                <ArrowRight size={24} />
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border-[16px] border-slate-50 h-[600px] relative"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.517011403064!2d73.9262757751928!3d18.55071578254884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c160ff267b09%3A0xa65b7cab600a193d!2sPOONA%20ENTERPRISES!5e0!3m2!1sen!2sin!4v1747400030541!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: "grayscale(1) contrast(1.2) opacity(0.8)" }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
