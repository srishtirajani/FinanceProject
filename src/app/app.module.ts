
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { IndexComponent } from './components/index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { AdminComponent } from './components/admin/admin.component';
import { PaymentComponent } from './components/payment/payment.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path:'terms', component:TermsComponent},
  { path:'forgotpassword', component:ForgotpasswordComponent},
  { path:'changepassword', component:ChangepasswordComponent},
  { path:'dashboard', component:DashboardComponent},
  { path:'productlist', component:ProductListComponent},
  { path:'productinfo', component:ProductInfoComponent},
  { path:'payment', component:PaymentComponent},
  { path:'admin', component:AdminComponent},
  { path:'verify', component:VerifyUserComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    IndexComponent,
    DashboardComponent,
    ProductListComponent,
    ProductInfoComponent,
    AdminComponent,
    PaymentComponent,
    VerifyUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
