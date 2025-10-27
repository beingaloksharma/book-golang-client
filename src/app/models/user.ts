import { CartItem } from "./cart-item";
import { Order } from "./order";

export interface User {
  name: string;
  username: string;
  address?: string[];
  carts?: CartItem[];
  order?: Order[];
}
