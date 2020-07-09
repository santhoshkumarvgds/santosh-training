import { BrowserModule } from '@angular/platform-browser';
// import { StripeCheckoutModule } from 'ng-stripe-checkout';
// import { StripeCheckoutModule } from 'ng-stripe-checkout';
// import { NgxStripeModule } from 'ngx-stripe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { PendingApprovelComponent } from './home/pending-approvel/pending-approvel.component';
import { GetinfoComponent } from './getinfo/getinfo.component';
import { ProductComponent } from './product/product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddAdminComponent } from './home/admin/add-admin/add-admin.component';
import { PendingUserComponent } from './home/admin/pending-user/pending-user.component';
import { OrdersComponent } from './home/user/orders/orders.component';
import { AddproductComponent } from './home/seller/addproduct/addproduct.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AdminInviteComponent } from './home/admin/admin-invite/admin-invite.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { ServiceWorkerModule } from '@angular/router/service-worker/';
import { environment } from '../environments/environment';
import { PushNotificationServiceService } from './push-notification-service.service';
import { SwPush, SwUpdate } from '@angular/router/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PendingApprovelComponent,
    GetinfoComponent,
    ProductComponent,
    ViewProductComponent,
    AddAdminComponent,
    PendingUserComponent,
    OrdersComponent,
    AddproductComponent,
    LogoutComponent,
    AdminInviteComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    PushNotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [PushNotificationServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
