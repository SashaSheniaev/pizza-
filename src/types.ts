export interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  ingredients: string[];
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
}

export interface Order {
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
}

