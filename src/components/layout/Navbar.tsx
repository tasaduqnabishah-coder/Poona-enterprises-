import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Sell to Us', path: '/sell' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300",
        scrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm" 
          : "bg-transparent py-8"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center group">
              <span className={cn(
                "font-serif text-2xl md:text-3xl font-black tracking-tight transition-colors duration-300",
                scrolled || location.pathname !== '/' ? "text-slate-900" : "text-white"
              )}>
                Poona <span className="text-primary italic">Enterprises.</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                    scrolled || location.pathname !== '/'
                      ? location.pathname === route.path ? "text-primary" : "text-slate-600 hover:text-slate-900"
                      : location.pathname === route.path ? "text-white underline underline-offset-8" : "text-white/80 hover:text-white"
                  )}
                >
                  {route.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "focus:outline-none transition-colors p-2",
                  scrolled || location.pathname !== '/' ? "text-slate-900" : "text-white"
                )}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Moved outside nav for better z-index control */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-[110] bg-white w-full h-full overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center px-4 h-20 border-b border-slate-50 shrink-0">
              <span className="font-serif text-2xl font-black text-slate-900">Poona <span className="text-primary">Enterprises.</span></span>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-900"><X size={24} /></button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 flex flex-col justify-center">
              <div className="space-y-8">
                {routes.map((route, i) => (
                  <motion.div
                    key={route.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={route.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block text-4xl font-serif font-bold transition-all",
                        location.pathname === route.path ? "text-primary" : "text-slate-900"
                      )}
                    >
                      {route.name}
                      {location.pathname === route.path && <span className="text-primary ml-2">.</span>}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-16 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Quick Contact</p>
                <a href="tel:+917875294904" className="block text-xl font-serif font-bold text-slate-900 mb-2">+91 78752 94904</a>
                <p className="text-sm text-slate-500 italic font-light">Wadgaon Sheri, Pune</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
