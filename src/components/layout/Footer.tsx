import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, MessageSquare, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center group">
              <span className="font-serif text-3xl font-black tracking-tight text-slate-900">
                Poona <span className="text-primary italic">Enterprises.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Pune's premiere rental agency for fine furniture and appliances. Curating spaces since 2008.
            </p>
            <div className="flex gap-6">
              {[Globe, MessageSquare, Share2].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-primary transition-colors duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Products', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-xs text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Collection</h4>
            <ul className="space-y-4">
              {['Electronics', 'Furniture', 'Living Room', 'Kitchen Essentials'].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-xs text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Support</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="text-primary mt-1">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Enquiries</p>
                  <p className="text-sm font-bold text-slate-900">+91 78752 94904</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="text-primary mt-1">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                  <p className="text-sm font-bold text-slate-900">tasaduqnabishah@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            © {new Date().getFullYear()} Poona Enterprises. Designed for Pune.
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Disclaimer'].map(item => (
              <a key={item} href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
