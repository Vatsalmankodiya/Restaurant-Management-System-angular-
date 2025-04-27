// src/app/services/table-booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ADMIN_ALL_BOOKINGS_URL, TABLE_BOOKING_URL, USER_BOOKING_HISTORY_URL } from '../shared/constants/urls'; // Assuming you define this URL

interface BookingResponse {
  message: string;
  booking: any; // You can create a more specific interface if needed
}
interface BookingHistoryResponse {
  message: string;
  bookings: any[];
}

@Injectable({
  providedIn: 'root'
})
export class TableBookingService {
  constructor(private http: HttpClient) {}

  bookTable(bookingData: any): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(TABLE_BOOKING_URL + '/book', bookingData);

    
  }
  getBookingHistory(userId: string): Observable<BookingHistoryResponse> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<BookingHistoryResponse>(`${TABLE_BOOKING_URL}/history`, { params });
  }
  getAllBookingsForAdmin(): Observable<BookingHistoryResponse> {
    return this.http.get<BookingHistoryResponse>(ADMIN_ALL_BOOKINGS_URL);
  }
  
  
  
}