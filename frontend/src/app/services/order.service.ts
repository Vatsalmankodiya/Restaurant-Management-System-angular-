// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Order } from '../shared/models/order';
// import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL } from '../shared/constants/urls';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {


//   constructor(private http: HttpClient) { }

 

//   create(order:Order){
//     return this.http.post<Order>(ORDER_CREATE_URL, order);
//   }

//   getNewOrderForCurrentUser():Observable<Order>{
//     return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
//   }

//   // pay(order:Order):Observable<string>{
//   //   return this.http.post<string>(ORDER_PAY_URL,order);
//   // }

//   // trackOrderById(id:number): Observable<Order>{
//   //   return this.http.get<Order>(ORDER_TRACK_URL + id);
//   // }

// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../shared/models/order';
import {
  ORDER_ADMIN_ORDERS_URL,
  ORDER_CREATE_URL,
  ORDER_NEW_FOR_CURRENT_USER_URL,
  ORDER_PAY_URL,
  ORDER_TRACK_URL,
  ORDER_USER_ORDERS_URL
} from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: Order | null = null;

  constructor(private http: HttpClient) {}

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  pay(orderId: string, cardNumber: string, expiry: string, cvv: string, paymentId: string): Observable<any> {
    return this.http.post<any>(`${ORDER_PAY_URL}/${orderId}`, {
      cardNumber,
      expiry,
      cvv,
      paymentId
    });
  }

  // ✅ Add this to temporarily store the order
  setOrder(order: Order) {
    this.order = order;
  }

  // ✅ Use this in payment.component to retrieve it
  getStoredOrder(): Order | null {
    return this.order;
  }
  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDER_USER_ORDERS_URL);
}

getAllOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(ORDER_ADMIN_ORDERS_URL); // adjust API URL as needed
}
  trackOrderById(id:number): Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }
}
