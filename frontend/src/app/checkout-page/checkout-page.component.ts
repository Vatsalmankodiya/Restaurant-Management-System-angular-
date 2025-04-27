// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { CartService } from 'src/app/services/cart.service';
// import { UserService } from 'src/app/services/user.service';
// import { Order } from '../shared/models/order';
// import { OrderService } from '../services/order.service';

// @Component({
//   selector: 'app-checkout-page',
//   templateUrl: './checkout-page.component.html',
//   styleUrls: ['./checkout-page.component.css']
// })
// export class CheckoutPageComponent implements OnInit {
//   checkoutForm!: FormGroup;
//   order: Order = new Order();

//   constructor(
//     private cartService: CartService,
//     private formBuilder: FormBuilder,
//     private userService: UserService,
//     private orderService: OrderService,
//     private toastrService: ToastrService,
//     private router: Router
//   ) {
//     const cart = this.cartService.getCart();
//     this.order.items = cart.items;
//     this.order.totalPrice = cart.totalPrice;
//   }

//   ngOnInit(): void {
//     const { name, address } = this.userService.currentUser;

//     this.checkoutForm = this.formBuilder.group({
//       name: [name, [Validators.required]],
//       address: [address, [Validators.required]]
//     });
//   }

//   get fc() {
//     return this.checkoutForm.controls;
//   }

//   createOrder() {
//     if (this.checkoutForm.invalid) {
//       this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
//       return;
//     }
//     if(!this.order.addressLatLng){
//       this.toastrService.warning('Please select your location on the map', 'Location');
//       return;
//     }

//     this.order.name = this.fc.name.value;
//     this.order.address = this.fc.address.value;

//     console.log(this.order);

//     this.orderService.create(this.order).subscribe({
//       next: () => {
//         this.router.navigateByUrl('/payment');
//       },
//       error: (errorResponse) => {
//         this.toastrService.error(errorResponse.error, 'Cart');
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from '../shared/models/order';
import { OrderService } from '../services/order.service';
// import {orderService} from '../services/order.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm!: FormGroup;
  order: Order = new Order();

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private orderService: OrderService  // ✅ Add this line
  ) {
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    const { name, address, id } = this.userService.currentUser;
    this.order.userId = id;

    this.checkoutForm = this.formBuilder.group({
      name: [name, [Validators.required]],
      address: [address, [Validators.required]]
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }
  
    if (!this.order.addressLatLng) {
      this.toastrService.warning('Please select your location on the map', 'Location');
      return;
    }
  
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
  
    // ✅ Call backend to create order
    this.orderService.create(this.order).subscribe({
      next: (newOrder: Order) => {
        // ✅ Store the returned order (with _id) into localStorage
        // this.orderService.setOrder(newOrder); // optional, if you're using service state
        localStorage.setItem('currentOrder', JSON.stringify(newOrder));
        this.router.navigateByUrl('/payment');
      },
      error: (errorResponse: any) => {
        this.toastrService.error(errorResponse.error, 'Order Error');
      }
    });
  }
  
  
}
