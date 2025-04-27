import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
// import { OrderService } from '../services/order.service';

interface Food {
  name: string;
  imageUrl: string;
}

interface OrderItem {
  food: Food;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  status: string;
  paymentId?: string;
  createdAt: Date;
}

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders: any) => {
        // Convert _id to id if necessary
        this.orders = orders.map((order: any) => ({
          ...order,
          id: order._id
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
        this.error = 'Failed to load orders.';
        this.loading = false;
      }
    });
  }
}
