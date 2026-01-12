
import { Product } from './types';

export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty & Health',
  'Sports & Outdoors',
  'Books',
  'Toys'
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Pro Wireless Headphones',
    description: 'High-fidelity audio with active noise cancellation.',
    price: 299,
    category: 'Electronics',
    sellerId: 'seller1',
    image: 'https://picsum.photos/seed/headphones/400/400',
    brand: 'SonicStream',
    rating: 4.8,
    stock: 15
  },
  {
    id: 'p2',
    name: 'Smart Watch Series 5',
    description: 'Track your health and stay connected on the go.',
    price: 199,
    category: 'Electronics',
    sellerId: 'seller1',
    image: 'https://picsum.photos/seed/watch/400/400',
    brand: 'TechWear',
    rating: 4.5,
    stock: 22
  },
  {
    id: 'p3',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable seating for long working hours.',
    price: 350,
    category: 'Home & Kitchen',
    sellerId: 'seller2',
    image: 'https://picsum.photos/seed/chair/400/400',
    brand: 'ComfySit',
    rating: 4.2,
    stock: 8
  },
  {
    id: 'p4',
    name: 'Premium Cotton T-Shirt',
    description: 'Breathable and stylish cotton shirt for all seasons.',
    price: 25,
    category: 'Fashion',
    sellerId: 'seller2',
    image: 'https://picsum.photos/seed/shirt/400/400',
    brand: 'Trendset',
    rating: 4.0,
    stock: 100
  }
];
