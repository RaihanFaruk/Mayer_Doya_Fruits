export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image_url: string;
  stock: number;
  is_active: boolean;
  created_at?: string;
  category?: string;
  badge?: string;
  discountBadge?: string;
  origin?: string;
  originalPrice?: number;
  description?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  quantity: number;
  price_at_order: number;
  product?: Product;
}

export interface Order {
  id: string;
  customer_id: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  created_at: string;
  customer?: Customer;
  order_items?: OrderItem[];
}
