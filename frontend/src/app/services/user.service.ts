import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  USER_LOGIN_URL,
  ADMIN_LOGIN_URL,
  USER_REGISTER_URL,
  USER_CHANGE_PASSWORD_URL,
} from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

interface ChangePasswordResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  private changePasswordUrl = USER_CHANGE_PASSWORD_URL;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  // ✅ Client Login
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user: User) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to Foodmine, ${user.name}!`, 'Login Successful');
        },
        error: (errorResponse: any) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  // ✅ Admin Login
  adminLogin(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(ADMIN_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user: User) => {
          if (user.isAdmin) {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.toastrService.success(`Welcome Admin, ${user.name}!`, 'Admin Login Successful');
          } else {
            this.toastrService.error('You are not an admin!', 'Access Denied');
          }
        },
        error: (errorResponse: any) => {
          this.toastrService.error(errorResponse.error, 'Admin Login Failed');
        },
      })
    );
  }

  // ✅ User Registration
  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to Foodmine, ${user.name}`, 'Register Successful');
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        },
      })
    );
  }

  // ✅ Logout
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  // ✅ Change Password (now includes email in request)
  changePassword(currentPassword: string, newPassword: string): Observable<ChangePasswordResponse> {
    const body = {
      email: this.currentUser.email, // <-- This is required by backend
      currentPassword,
      newPassword,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add Authorization header here if needed in future
    });

    return this.http.post<ChangePasswordResponse>(this.changePasswordUrl, body, { headers });
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
