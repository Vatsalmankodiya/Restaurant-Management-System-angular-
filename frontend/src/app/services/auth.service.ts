import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Store the user information after login
  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));  // Store user object as JSON in localStorage
  }

  // Get the current user ID (or the whole user object if needed)
  getCurrentUserId(): string | null {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.userId || parsedUser._id || parsedUser.id || null; // Check for potential other ID names
    }
    return null;
  }

  // Remove the current user (e.g., when logging out)
  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.getCurrentUserId() !== null;
  }
}
