import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService, Data } from 'src/app/services/admin.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router: Router, private data: Data) { }
  isButtonVisible=false;
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
    this.isButtonVisible = true;
  }
  Check(){
    //alert('successful');
    console.log(this.checkOTP.value);
    console.log(this.generateOTP.get('phoneno')?.value%1000)
    if(this.checkOTP.get('otp')?.value==this.generateOTP.get('phoneno')?.value%1000)
    {this.data.storage=this.generateOTP.get('phoneno')?.value;
    this.router.navigate(['changepassword']);}
    else{
      alert("Invalid OTP!! Please try again.")
    }
  }
  
}
export class NameEditorComponent {
  phoneno = new FormControl('');
}