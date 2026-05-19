import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { getWhatsAppLink } from '../../lib/config';

interface WhatsAppButtonProps {
  message?: string;
}

export default function WhatsAppButton({ message = "Hi, I would like to know more about your services." }: WhatsAppButtonProps) {
  const whatsappUrl = getWhatsAppLink(message);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}
