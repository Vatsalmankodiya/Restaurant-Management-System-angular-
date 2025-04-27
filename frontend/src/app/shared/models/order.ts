import { LatLng } from 'leaflet'; // Ensure LatLng is correctly imported
import { CartItem } from './cartitem'; // Assuming CartItem is defined in a separate file

export class Order {
  _id!: string;  // Added the _id field here
  userId!: string;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  addressLatLng?: LatLng;
  cardNumber!: string;
  expiry!: string;
  cvv!: string;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
