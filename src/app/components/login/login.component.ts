import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Consumer } from 'src/app/models/consumer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  consumer=new Consumer("",new Date(),"","","","","","",false,"","","", false);

  constructor() { }

  ngOnInit(): void {
  }

  login(form:NgForm){
    console.log(form.value.userName);
    console.log(form.value.password);
    form.resetForm();
  }

}
