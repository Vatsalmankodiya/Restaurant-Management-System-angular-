import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/food';
import { FoodService } from '../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../shared/models/tag';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user';
import { TableBookingService } from '../services/table-booking.service';
import { LatLngLiteral } from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  filteredFoods: Food[] = [];
  sample_tags: Tag[] = [
    { name: 'All', count: 9 },
    { name: 'FastFood', count: 9 },
    { name: 'Pizza', count: 3 },
    { name: 'burger', count: 3 },
    { name: 'Fries', count: 1 },
    { name: 'pasta', count: 2 },
  ];

  selectedTag: string = 'All'; // Default active category
  currentUser: User | null = null; // Initialize as null

  // Table booking properties (copied from TablebookComponent)
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
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private tableBookingService: TableBookingService // Inject TableBookingService
  ) {
    // Initialize minDate and maxDate for table booking
    const today = new Date();
    this.minDate = this.formatDate(today);

    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);
    this.maxDate = this.formatDate(oneMonthLater);
  }

  ngOnInit(): void {
    this.loadFoods();
    this.subscribeToUser();
  }

  loadFoods(): void {
    this.foodService.getAll().subscribe({
      next: (foods) => {
        this.foods = foods;
        this.filteredFoods = foods; // Initialize filtered foods with all foods
      },
      error: (err) => {
        console.error("Error fetching foods:", err);
      }
    });
  }

  subscribeToUser(): void {
    this.userService.userObservable.subscribe(user => {
      this.currentUser = user;
      this.userId = this.currentUser?.id || null; // Update userId when user changes
      // console.log('Current User in Home:', this.currentUser);
      // console.log('Current User ID in Home:', this.userId);
    });
  }

  filterByTag(tag: string) {
    this.selectedTag = tag;

    if (tag === "All") {
      this.filteredFoods = this.foods;
    } else {
      this.filteredFoods = this.foods.filter(food =>
        food.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }

    console.log("Filtered Foods:", this.filteredFoods);
  }

  gotoadmin() {
    this.router.navigate(['/adminhome']); // Change this route as needed
  }

  // Table booking methods (copied and potentially adjusted)
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

    // ✅ Now, the userId will be populated if the user is logged in
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