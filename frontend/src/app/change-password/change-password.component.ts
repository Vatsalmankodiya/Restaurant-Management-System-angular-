import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordsMatchValidator } from '../shared/validators/password_match_validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  isSubmitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(5)]],
      confirmNewPassword: ['', Validators.required]
    }, {
      validators: PasswordsMatchValidator('newPassword', 'confirmNewPassword')
    });
  }

  get fc() {
    return this.changePasswordForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.loading = true;
    const { currentPassword, newPassword } = this.changePasswordForm.value;

    // Assuming you have a backend API endpoint for changing password
    this.userService.changePassword(currentPassword, newPassword).subscribe({
      next: (response) => {
        this.loading = false;
        this.toastrService.success('Password changed successfully!', 'Success');
        this.router.navigate(['/profile']); // Redirect to profile page after success
      },
      error: (errorResponse) => {
        this.loading = false;
        this.toastrService.error(errorResponse.error || 'Failed to change password. Please try again.', 'Error');
      }
    });
  }
}