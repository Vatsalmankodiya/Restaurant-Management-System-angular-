  import { model, Schema, Types } from 'mongoose';
  import { OrderStatus } from '../constants/order_status';
  import { Food, FoodSchema } from './food.model';

  export interface LatLng {
    lat: string;
    lng: string;
  }

  export const LatLngSchema = new Schema<LatLng>(
    {
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
    { _id: false }
  );

  export interface OrderItem {
    food: Food;
    price: number;
    quantity: number;
  }

  export const OrderItemSchema = new Schema<OrderItem>(
    {
      food: { type: FoodSchema, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    { _id: false }
  );

  export interface Order {
    id: string;
    items: OrderItem[];
    totalPrice: number;
    name: string;
    address: string;
    addressLatLng: LatLng;
    paymentId: string;
    status: OrderStatus;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }

  const orderSchema = new Schema<Order>(
    {
      name: { type: String, required: true },
      address: { type: String, required: true },
      addressLatLng: { type: LatLngSchema, required: true },
      paymentId: { type: String, required: false }, // Optional for now
      totalPrice: { type: Number, required: true },
      items: { type: [OrderItemSchema], required: true },
      status: {
        type: String,
        enum: Object.values(OrderStatus), // Ensures only valid OrderStatus values are allowed
        default: OrderStatus.NEW,
      },
      userId: { type: Schema.Types.ObjectId, required: true, ref: 'UserId' },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );

  export const OrderModel = model('Order', orderSchema);
