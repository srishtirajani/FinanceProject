import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

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
    console.log(this.loginService.logins);
    console.log(this.loginService.consumers);
    console.log(this.loginService.admins);
    var result=this.loginService.login(form.value.userName, form.value.password);

    if(result=="consumer")
    {
      localStorage.setItem("userName",form.value.userName);
      this.router.navigate(['dashboard']);
    }
    else if(result=="admin")
    {
      localStorage.setItem("userName",form.value.userName);
      this.router.navigate(['admin']);
    }
    else{
      console.log("Invalid Credentials!");
    }
    form.resetForm();
  }
}
