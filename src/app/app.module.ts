
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
import { RegisterComponent } from './components/register/register.component';
import { PasswordvalidatorDirective } from './passwordvalidator.directive';

import { HttpClientModule } from '@angular/common/http';
import { CardTypePipe } from './pipes/card-type.pipe';
import { AdminService, Data } from './services/admin.service';
import { NavbarLoggedInComponent } from './components/navbar-logged-in/navbar-logged-in.component';





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
    VerifyUserComponent,
    RegisterComponent,
    PasswordvalidatorDirective
    CardTypePipe,
    NavbarLoggedInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [Data, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
