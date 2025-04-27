import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../shared/models/feedback';
import { Observable } from 'rxjs';
import { FEEDBACK_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  submitFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(FEEDBACK_URL, feedback);  // No changes here
  }
}
