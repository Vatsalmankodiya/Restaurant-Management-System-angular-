import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  order!: Order;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.activatedRoute.snapshot.params['id'];
    console.log('Tracking Order ID:', orderId); // <- already here
  
    if (!orderId) return;
  
    this.orderService.trackOrderById(orderId).subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (err) => {
        console.error('Error loading order:', err);
      }
    });
  }
  
  
}
