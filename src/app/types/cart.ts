export interface CartItem {
  productId: string | { _id: string; name: string }; // admite ID plano o populado
  price: number;
  quantity: number;
}

export interface Cart {
  userId?: string;
  items: CartItem[];
}
