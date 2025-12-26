export type Category = 'pizza' | 'burger' | 'drink' | 'icecream' | 'fastfood';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  ingredients?: string[];
  volume?: string; // для напитков
  weight?: string; // для бургеров и фастфуда
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
}

