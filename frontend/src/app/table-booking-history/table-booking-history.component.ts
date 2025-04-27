import { Component, OnInit } from '@angular/core';
import { TableBookingService } from '../services/table-booking.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-table-booking-history',
  templateUrl: './table-booking-history.component.html',
  styleUrls: ['./table-booking-history.component.css']
})
export class TableBookingHistoryComponent implements OnInit {
  bookingHistory: any[] = [];
  loading = true;
  error: string = '';
  userId: string | null = null;

  constructor(
    private tableBookingService: TableBookingService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.currentUser?.id || null;
  
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.tableBookingService.getBookingHistory(this.userId).subscribe({
      next: (response) => {
        this.bookingHistory = response.bookings;
        this.loading = false;
        if (this.bookingHistory.length === 0) {
          this.error = 'No booking history found.';
        }
      },
      error: (error) => {
        this.error = 'Failed to load booking history.';
        this.loading = false;
        console.error(error);
      },
    });
  }
}
