// Global configuration for Poona Enterprises
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "917875294904";
export const BUSINESS_EMAIL = "tasaduqnabishah@gmail.com";
export const BUSINESS_PHONE_DISPLAY = "+91 78752 94904";

/**
 * Generates a correctly encoded WhatsApp contact link.
 * @param message The pre-filled message text.
 */
export const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
};

/**
 * Generates a clean tel protocol link.
 */
export const getTelLink = () => {
  return `tel:+${WHATSAPP_NUMBER.replace(/\D/g, '')}`;
};
