import { Component, OnInit } from '@angular/core';
import { TableBookingService } from 'src/app/services/table-booking.service';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.css']
})
export class AdminBookingComponent implements OnInit {
  bookings: any[] = [];

  constructor(private tableBookingService: TableBookingService) {}

  ngOnInit(): void {
    this.tableBookingService.getAllBookingsForAdmin().subscribe({
      next: (res) => {
        this.bookings = res.bookings;
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      },
    });
  }
}