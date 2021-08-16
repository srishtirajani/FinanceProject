import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 
  constructor(private loginService:LoginService, private router:Router) { }
  flag = true;
  ngOnInit(): void {
    this.loginService.GetAllLogins().subscribe(data=>{
      this.loginService.logins=data;
    });
    this.loginService.GetAllConsumers().subscribe(data=>{
      this.loginService.consumers=data;
    });
    this.loginService.GetAllAdmins().subscribe(data=>{
      this.loginService.admins=data;
    });
  }

  login(form:NgForm){
    
    var result=this.loginService.login(form.value.userName, form.value.password);

    if(result=="consumer")
    {
      this.flag=true;
      localStorage.setItem("userName",form.value.userName);
      localStorage.setItem("userName_guard", result);
      this.router.navigate(['dashboard']);
    }
    else if(result=="admin")
    {
      this.flag=true;
      localStorage.setItem("userName",result);
      this.router.navigate(['admin']);
    }
    else{
      this.flag=false;
      console.log("Invalid Credentials!");
    }
    form.resetForm();
  }
}
