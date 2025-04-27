import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: User | null; // Allow null to handle non-logged-in state

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  get isAuth(): boolean {
    return !!this.user?.token; // Ensure token exists
  }

  logout(): void {
    // Call the logout function from the user service
    this.userService.logout();

    // Clear user-related data from localStorage
    localStorage.removeItem('currentUser');  // Remove user data
    localStorage.removeItem('currentOrder');  // Remove any order data
    localStorage.clear();  // Optionally clear all localStorage data (this is an additional step)

    // Reset user data in the component
    this.user = null;
  }
}
