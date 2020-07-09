import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PendingApprovelComponent } from './home/pending-approvel/pending-approvel.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { HomeComponent } from './home/home.component';
import { AdminInviteComponent } from './home/admin/admin-invite/admin-invite.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: HomeComponent },
  { path: 'seller', component: HomeComponent },
  { path: 'user', component: HomeComponent },
  { path: 'pendingapprovel', component: PendingApprovelComponent },
  { path: 'product/:id', component: ViewProductComponent },
  { path: 'admin/invite/:hash', component: AdminInviteComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'password/change/:hash', component: UpdatePasswordComponent },
  { path: 'push', component: PushNotificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  ngOnInit(){
  }
}
