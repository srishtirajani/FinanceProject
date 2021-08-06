import { Component } from '@angular/core';
import { NgForm, Validator } from '@angular/forms';
import { Consumer } from 'src/app/models/consumer';
import { RegService } from 'src/app/reg.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor (public service : RegService) {}

  banks = ['IDFC','HSBC','HDFC','ICICI']
  obj = new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  opw : string = "";
  card : string ="";
  flag : boolean = false;

  radioClicked() {
    this.flag = true;
  }

  onSubmit(form:NgForm) {
    this.service.postReg().subscribe(
      res => {},
      err => {console.log(err);}
    )
  }

}



