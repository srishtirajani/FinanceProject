import { Component } from '@angular/core';
import { NgForm, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { Consumer } from 'src/app/models/consumer';
import { RegService } from 'src/app/services/reg.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor (public service : RegService, private router:Router) {}

  banks = ['IDFC','HSBC','HDFC','ICICI']
  obj = new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  opw : string = "";
  card : string ="";
  flag : boolean = false;

  // msg:string="";

  radioClicked() {
    this.flag = true;
  }

  onSubmit(form:NgForm) {
    this.service.postReg().subscribe(
      res => {this.router.navigate(['login'])},
      err => {console.log(err);}
    );
  }

  // onSubmit(form:NgForm):void
  // {
  //   this.service.createUser(form).subscribe(data=>{
  //   this.msg="Successfully created "+data.cName;
  //   //Logging the response received from web api.
  //   console.log(data);
  //   })
  // }

}



