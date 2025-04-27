import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { TablebookComponent } from './tablebook/tablebook.component';
// import { DashbordComponent } from './admin/component/dashbord/dashbord.component';
// import { AdminloginComponent } from './admin/component/adminlogin/adminlogin.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { MapComponent } from './components/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentComponent } from './components/payment/payment.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { TrackComponent } from './components/track/track.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { TableBookingHistoryComponent } from './table-booking-history/table-booking-history.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddFoodComponent } from './admin/add-food/add-food.component';
import { AdminHeadComponent } from './admin/admin-head/admin-head.component';
import { EditFoodComponent } from './admin/edit-food/edit-food.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminBookingComponent } from './admin/admin-booking/admin-booking.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FixMapComponent } from './components/fix-map/fix-map.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FoodPageComponent,
    RegisterComponent,
    AboutComponent,
    TablebookComponent,
    // DashbordComponent,
    // AdminloginComponent,
    MenuComponent,
    SearchComponent,
    CartPageComponent,
    CheckoutPageComponent,
    OrderListComponent,
    MapComponent,
    PaymentComponent,
    PaypalComponent,
    TrackComponent,
    FeedbackComponent,
    OrderHistoryComponent,
    TableBookingHistoryComponent,
    AdminHomeComponent,
    AddFoodComponent,
    AdminHeadComponent,
    EditFoodComponent,
    AdminOrdersComponent,
    AdminBookingComponent,
    ProfileComponent,
    ChangePasswordComponent,
    FixMapComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
