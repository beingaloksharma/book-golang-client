import { CartItem } from "./cart-item";

export interface Order {
  order_id: string;
  name: string;
  cart: CartItem[];
  address: string;
  order_date: string;
  total: number;
  status: {
    type: string;
    reason: string;
    tracking_number?: string;
    shipping_carrier?: string;
  };
  payment: {
    paid: boolean;
    method?: string;
    paid_on?: string;
    reference?: string;
  }
}
