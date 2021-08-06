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
  obj = new Consumer(0,"","",new Date(),"","","","","",false,"","","",false);
  opw : string = "";
  card : string ="";
  flag : boolean = false;

  radioClicked() {
    this.flag = true;
  }
}



