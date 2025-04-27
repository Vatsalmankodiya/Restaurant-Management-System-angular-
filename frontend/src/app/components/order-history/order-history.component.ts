import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error = '';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
      this.loadUserOrders();
  }

  loadUserOrders(): void {
      this.loading = true;
      this.orderService.getUserOrders().subscribe({
          next: (orders) => {
              this.orders = orders;
              this.loading = false;
          },
          error: (err) => {
              this.error = 'Failed to load order history.';
              console.error(err);
              this.loading = false;
          }
      });
  }

}
