import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  rating: number = 0;
  comment: string = '';

  constructor(
    private feedbackService: FeedbackService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitFeedback() {
    const user = this.userService.currentUser;
    if (!user || !user.id) {
      this.toastr.error('User not logged in');
      return;
    }
  
    if (!this.rating || this.comment.trim() === '') {
      this.toastr.warning('Please enter rating and comment');
      return;
    }
  
    // ✅ Validate that the rating is between 1 and 5
    if (this.rating < 1 || this.rating > 5) {
      this.toastr.warning('Rating must be between 1 and 5');
      return;
    }
  
    const feedback = {
      userId: user.id,
      rating: this.rating,
      comment: this.comment,
      date: new Date()
    };
  
    this.feedbackService.submitFeedback(feedback).subscribe({
      next: () => {
        this.toastr.success('Thank you for your feedback!');
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.toastr.error('Failed to submit feedback. Please try again.');
      }
    });
  }
  
}
