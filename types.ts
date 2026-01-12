
export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sellerId: string;
  image: string;
  brand: string;
  rating: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum OrderStatus {
  PENDING = 'Pending',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export interface Order {
  id: string;
  buyerId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
}

export interface AppState {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  searchQuery: string;
  categoryFilter: string;
}
