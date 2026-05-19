import { describe, it, expect } from 'vitest';

interface FakeProduct {
  id: string;
  title: string;
  price: number;
  rentalPrices?: {
    oneMonth: number;
  };
  category: string;
  type: 'rent' | 'sale';
  description: string;
}

const mockProducts: FakeProduct[] = [
  {
    id: '1',
    title: 'Samsung Smart AC',
    price: 35000,
    rentalPrices: { oneMonth: 2500 },
    category: 'electronics',
    type: 'rent',
    description: 'High efficiency cooling with smart features'
  },
  {
    id: '2',
    title: 'Designer Sofa Set',
    price: 45000,
    rentalPrices: { oneMonth: 4500 },
    category: 'furniture',
    type: 'rent',
    description: 'Luxurious velvet sofa set for your living room'
  },
  {
    id: '3',
    title: 'Double Door Refrigerator',
    price: 28000,
    rentalPrices: { oneMonth: 1800 },
    category: 'electronics',
    type: 'rent',
    description: 'Spacious double door fridge'
  },
  {
    id: '4',
    title: 'Office Desk Chair',
    price: 8500,
    category: 'furniture',
    type: 'sale',
    description: 'Ergonomic office seating'
  }
];

describe('Catalog Search and Sorting Logic', () => {
  it('should filter products by title or description matching query case-insensitively', () => {
    const query = 'smart';
    const filtered = mockProducts.filter(p => {
      const q = query.toLowerCase().trim();
      return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    });
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0].title).toBe('Samsung Smart AC');
  });

  it('should return all products if search query is empty', () => {
    const query = '';
    const filtered = mockProducts.filter(p => {
      const q = query.toLowerCase().trim();
      if (!q) return true;
      return p.title.toLowerCase().includes(q);
    });
    
    expect(filtered).toHaveLength(mockProducts.length);
  });

  it('should sort products by Price: Low to High based on active type price', () => {
    const sorted = [...mockProducts].sort((a, b) => {
      const priceA = a.type === 'rent' ? (a.rentalPrices?.oneMonth || a.price) : a.price;
      const priceB = b.type === 'rent' ? (b.rentalPrices?.oneMonth || b.price) : b.price;
      return priceA - priceB;
    });

    // Prices for rent oneMonth or sale price:
    // Samsung AC: 2500
    // Velvet Sofa: 4500
    // Refrigerator: 1800
    // Chair: 8500
    // Expected order: Refrigerator (1800) -> Samsung AC (2500) -> Velvet Sofa (4500) -> Chair (8500)
    expect(sorted[0].title).toBe('Double Door Refrigerator');
    expect(sorted[1].title).toBe('Samsung Smart AC');
    expect(sorted[2].title).toBe('Designer Sofa Set');
    expect(sorted[3].title).toBe('Office Desk Chair');
  });

  it('should sort products by Price: High to Low based on active type price', () => {
    const sorted = [...mockProducts].sort((a, b) => {
      const priceA = a.type === 'rent' ? (a.rentalPrices?.oneMonth || a.price) : a.price;
      const priceB = b.type === 'rent' ? (b.rentalPrices?.oneMonth || b.price) : b.price;
      return priceB - priceA;
    });

    // Expected order: Chair (8500) -> Velvet Sofa (4500) -> Samsung AC (2500) -> Refrigerator (1800)
    expect(sorted[0].title).toBe('Office Desk Chair');
    expect(sorted[1].title).toBe('Designer Sofa Set');
    expect(sorted[2].title).toBe('Samsung Smart AC');
    expect(sorted[3].title).toBe('Double Door Refrigerator');
  });
});
