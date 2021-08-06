import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { TermsComponent } from './components/terms/terms.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'terms', component:TermsComponent},
  { path:'forgotpassword', component:ForgotpasswordComponent},
  { path:'changepassword', component:ChangepasswordComponent},
  { path:'dashboard', component:DashboardComponent},
  { path:'productlist', component:ProductListComponent},
  { path:'productinfo', component:ProductInfoComponent},
  { path:'payment', component:PaymentComponent},
  { path:'admin', component:AdminComponent},
  { path:'verify', component:VerifyUserComponent},
  { path:'register', component:RegisterComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
