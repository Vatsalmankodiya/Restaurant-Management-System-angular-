import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { PaymentService } from 'src/app/services/payment.service';
import { OrderService } from 'src/app/services/order.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  order!: Order;

  cardNumber: string = '';
  expiry: string = '';
  cvv: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cartService: CartService,
    private userService: UserService,
    private paymentService: PaymentService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderJson = localStorage.getItem('currentOrder');
    if (!orderJson) {
      this.toastr.error('No order found!');
      this.router.navigateByUrl('/');
      return;
    }

    this.order = JSON.parse(orderJson);

    if (!this.order._id) {
      this.toastr.error('Order ID is missing!');
      this.router.navigateByUrl('/');
    }
  }

  formatCardNumber(event: any): void {
    let inputValue = event.target.value.replace(/\D/g, '');
    if (inputValue.length <= 16) {
      inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    this.cardNumber = inputValue;
  }

  formatExpiry(event: any): void {
    let inputValue = event.target.value.replace(/\D/g, '');
    if (inputValue.length <= 4) {
      inputValue = inputValue.replace(/(\d{2})(?=\d)/g, '$1/');
    }
    this.expiry = inputValue;
  }

  validateCardDetails(): boolean {
    if (!this.cardNumber || !this.expiry || !this.cvv) {
      this.toastr.warning('Please enter all card details');
      return false;
    }

    const cardNumberPattern = /^(\d{4} \d{4} \d{4} \d{4})$/;
    if (!cardNumberPattern.test(this.cardNumber)) {
      this.toastr.warning('Card number should be in the format 4-4-4-4');
      return false;
    }

    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryPattern.test(this.expiry)) {
      this.toastr.warning('Expiry date must be in MM/YY format');
      return false;
    }

    const [month, year] = this.expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      this.toastr.warning('Card has expired');
      return false;
    }

    if (!/^\d{3}$/.test(this.cvv)) {
      this.toastr.warning('CVV must be 3 digits');
      return false;
    }

    return true;
  }

  pay() {
    if (!this.validateCardDetails()) return;

    const user = this.userService.currentUser;
    if (!user || !user.id) {
      this.toastr.error('User not logged in!');
      return;
    }

    const cardNumberClean = this.cardNumber.replace(/\s+/g, '');
    const paymentId = uuidv4();

    const paymentData = {
      orderId: this.order._id,
      userId: user.id,
      cardNumber: cardNumberClean,
      expiry: this.expiry,
      cvv: this.cvv,
      paymentId
    };

    // ✅ First: Save payment
    this.paymentService.createPayment(paymentData).subscribe({
      next: () => {
        // ✅ Second: Update order status on server (optional backend logic needed)
        this.orderService.pay(this.order._id, cardNumberClean, this.expiry, this.cvv, paymentId).subscribe({
          next: () => {
            this.cartService.clearCart();
            localStorage.removeItem('currentOrder');
            this.toastr.success('Payment successful. Order placed!');
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            console.error('Order status update failed', err);
            this.toastr.warning('Payment saved, but order status update failed.');
            this.router.navigateByUrl('/');
          }
        });
      },
      error: (err) => {
        console.error('Payment error', err);
        this.toastr.error('Failed to process payment. Try again.');
      }
    });
  }
}
