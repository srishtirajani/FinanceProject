import { Component } from '@angular/core';
import { Validator } from '@angular/forms';
import { Consumer } from 'src/app/models/consumer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  banks = ['IDFC','HSBC','HDFC','ICICI']
  obj = new Consumer("",new Date(),"","","","","","",false,"","","", false);
  flag : boolean = false
  rp : string = "";
  opw : string = "";
  card : string =""

  radioClicked() {
    this.flag = true;
  }
}



