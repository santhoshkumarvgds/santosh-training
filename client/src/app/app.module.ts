import { BrowserModule } from '@angular/platform-browser';
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
import { SellerProductComponent } from './home/seller/seller-product/seller-product.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent,HomeComponent, PendingApprovelComponent, GetinfoComponent, ProductComponent, ViewProductComponent, AddAdminComponent, PendingUserComponent, OrdersComponent, AddproductComponent, SellerProductComponent, LogoutComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgxPayPalModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
