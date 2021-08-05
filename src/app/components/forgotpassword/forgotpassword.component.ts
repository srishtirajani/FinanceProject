import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  generateOTP=new FormGroup({
    phoneno:new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$"), Validators.maxLength(10), Validators.minLength(10)]),
  })
  checkOTP=new FormGroup({
    otp:new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$")]),
  })
  Generator(){
    //alert('hi');
    console.log(this.generateOTP.value);
  }
  Check(){
    //alert('successful');
    console.log(this.checkOTP.value);
  }
  
}
export class NameEditorComponent {
  phoneno = new FormControl('');
}