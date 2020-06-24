import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminComponent } from './home/admin/admin.component';
import { SellerComponent } from './home/seller/seller.component';
import { UserComponent } from './home/user/user.component';
import { PendingApprovelComponent } from './home/pending-approvel/pending-approvel.component';
import { ViewProductComponent } from './view-product/view-product.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'seller', component: SellerComponent },
  { path: 'user', component: UserComponent },
  { path: 'pendingapprovel', component: PendingApprovelComponent },
  { path: 'product/:id', component: ViewProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  ngOnInit(){
    alert("work");
  }
}
