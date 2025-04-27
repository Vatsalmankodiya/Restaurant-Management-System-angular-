import { Component, OnInit } from '@angular/core';
import { TableBookingService } from '../services/table-booking.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LatLngLiteral } from 'leaflet';

@Component({
  selector: 'app-tablebook',
  templateUrl: './tablebook.component.html',
  styleUrls: ['./tablebook.component.css']
})
export class TablebookComponent implements OnInit {
  name: string = '';
  phoneNumber: string = '';
  email: string = '';
  persons: number | null = null;
  date: string = '';
  bookingMessage: string = '';
  errorMessage: string = '';
  userId: string | null = null;
  minDate: string;
  maxDate: string;
  readonlyMap = true;
  staticMapLat = 22.9787; // Declare and initialize staticMapLat
  staticMapLng = 70.7953; // Declare and initialize staticMapLng

  constructor(
    private tableBookingService: TableBookingService,
    private router: Router,
    private userService: UserService,
    // private authService: AuthService
  ) {
    const today = new Date();
    this.minDate = this.formatDate(today);

    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);
    this.maxDate = this.formatDate(oneMonthLater);
  }

  ngOnInit(): void {
    console.log('TableBookingComponent ngOnInit called');
    this.userId = this.userService.currentUser?.id || null; // Use UserService
    console.log('User ID from UserService:', this.userId);

    if (!this.userId) {
      console.warn('User not logged in. Table booking requires login.');
      this.errorMessage = 'Please log in to book a table.';
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  validateDate(): boolean {
    if (!this.date) {
      this.errorMessage = 'Please select a date.';
      return false;
    }

    const selectedDate = new Date(this.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);
    oneMonthLater.setHours(23, 59, 59, 999);

    if (selectedDate < today) {
      this.errorMessage = 'Booking date cannot be in the past.';
      return false;
    }

    if (selectedDate > oneMonthLater) {
      this.errorMessage = 'Booking can be made for a maximum of one month from today.';
      return false;
    }

    return true;
  }

  validatePhoneNumber(): boolean {
    if (!this.phoneNumber) {
      this.errorMessage = 'Please enter your phone number.';
      return false;
    }
    // Basic Indian phone number validation (you might need a more specific regex)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(this.phoneNumber)) {
      this.errorMessage = 'Please enter a valid 10-digit Indian phone number starting with 6-9.';
      return false;
    }
    return true;
  }

  validateEmail(): boolean {
    if (!this.email) {
      this.errorMessage = 'Please enter your email address.';
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return false;
    }
    return true;
  }

  bookNow(): void {
    this.errorMessage = ''; // Clear previous errors

    if (!this.name) {
      this.errorMessage = 'Please enter your name.';
      this.bookingMessage = '';
      return;
    }

    if (!this.validatePhoneNumber()) {
      this.bookingMessage = '';
      return;
    }

    if (!this.validateEmail()) {
      this.bookingMessage = '';
      return;
    }

    if (!this.persons) {
      this.errorMessage = 'Please select the number of persons.';
      this.bookingMessage = '';
      return;
    }

    if (!this.validateDate()) {
      this.bookingMessage = '';
      return;
    }

    if (!this.userId) {
      this.errorMessage = 'Please log in to book a table.';
      this.bookingMessage = '';
      return;
    }

    const bookingData = {
      name: this.name,
      phoneNumber: this.phoneNumber,
      email: this.email,
      persons: this.persons,
      date: this.date,
      userId: this.userId,
    };

    this.tableBookingService.bookTable(bookingData).subscribe({
      next: (response) => {
        this.bookingMessage = response.message;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Failed to book table.';
        console.error(error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        }
        this.bookingMessage = '';
      },
    });
  }
}