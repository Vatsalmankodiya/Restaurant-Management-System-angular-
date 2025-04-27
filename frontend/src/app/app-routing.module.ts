import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodPageComponent } from './food-page/food-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { TablebookComponent } from './tablebook/tablebook.component';
// import { AdminloginComponent } from './admin/component/adminlogin/adminlogin.component';
// import { DashbordComponent } from './admin/component/dashbord/dashbord.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { TrackComponent } from './components/track/track.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { TableBookingHistoryComponent } from './table-booking-history/table-booking-history.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminGuard } from './auth/admin.guard';
import { AddFoodComponent } from './admin/add-food/add-food.component';
import { EditFoodComponent } from './admin/edit-food/edit-food.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminBookingComponent } from './admin/admin-booking/admin-booking.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
// import { CartComponent } from './cart-page/cart-page.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'food/:id',component:FoodPageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'about',component:AboutComponent},
  {path:'tablebook',component:TablebookComponent},
  {path:'menu',component:MenuComponent},
  {path:'search',component:SearchComponent},
  {path:'cart',component:CartPageComponent},
  {path:'profile',component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'changepass',component:ChangePasswordComponent, canActivate:[AuthGuard]},
  {path:'checkout',component:CheckoutPageComponent, canActivate:[AuthGuard]},
  {path:'payment',component:PaymentComponent, canActivate:[AuthGuard]},
  {path:'track/:_id',component:TrackComponent, canActivate:[AuthGuard]},
  {path:'feedback',component:FeedbackComponent, canActivate:[AuthGuard]},
  {path:'orderhistory',component:OrderHistoryComponent, canActivate:[AuthGuard]},
  {path:'bookinghistory',component:TableBookingHistoryComponent, canActivate:[AuthGuard]},
  {path:'adminhome',component:AdminHomeComponent, canActivate:[AdminGuard]},
  {path:'add-food', component: AddFoodComponent, canActivate: [AuthGuard, AdminGuard] },
  {path:'edit-food/:id', component: EditFoodComponent, canActivate: [AuthGuard, AdminGuard] },
  {path:'admin-order', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminGuard] },
  {path:'admin-booking', component: AdminBookingComponent, canActivate: [AuthGuard, AdminGuard] },
  // {path:'admin/login',component:AdminloginComponent},
  // {path:'admin/dashbord',component:DashbordComponent},


  
  // {path:'login', component:LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
