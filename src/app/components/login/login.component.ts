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
  }

  login(form:NgForm){
    var result=this.loginService.login(form.value.userName, form.value.password);

    if(result)
    {
      localStorage.setItem("userName",form.value.userName);
      this.router.navigate(['dashboard']);
    }
    else
    {
      console.log("Invalid Credentials!");
    }
    
    form.resetForm();
  }

}
