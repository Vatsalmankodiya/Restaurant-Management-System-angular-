import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.currentUser;
    // Subscribe to userObservable to get updates if the user data changes
    this.userService.userObservable.subscribe(updatedUser => {
      this.user = updatedUser;
    });
  }

  ngOnInit(): void {
    // Ensure the user is logged in. If not, redirect to login page.
    if (!this.user.token) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    // Call the logout function from the user service
    this.userService.logout();

    // Clear user-related data from localStorage
    localStorage.removeItem('currentUser');  // Remove user data
    localStorage.removeItem('currentOrder');  // Remove any order data
    localStorage.clear();  // Optionally clear all localStorage data (this is an additional step)

    // Reset user data in the component
    
  }
}