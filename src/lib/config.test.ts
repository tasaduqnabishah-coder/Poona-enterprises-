import { describe, it, expect } from 'vitest';
import { getWhatsAppLink, getTelLink, WHATSAPP_NUMBER } from './config';

describe('Global Config & WhatsApp Link Utilities', () => {
  it('should have the correct business phone number', () => {
    expect(WHATSAPP_NUMBER).toBeDefined();
    expect(typeof WHATSAPP_NUMBER).toBe('string');
  });

  it('should generate a valid WhatsApp URL with encoded message', () => {
    const customMessage = "Hello World! Poona Enterprises";
    const link = getWhatsAppLink(customMessage);
    
    // Check that it's a wa.me URL
    expect(link).toContain('https://wa.me/');
    // Check it contains the correct clean phone number digits
    expect(link).toContain('917875294904');
    // Check that it encodes space as %20 or similar
    expect(link).toContain('text=Hello%20World!%20Poona%20Enterprises');
  });

  it('should generate a clean tel: protocol link with numeric characters only', () => {
    const telLink = getTelLink();
    expect(telLink).toBe('tel:+917875294904');
  });
});
