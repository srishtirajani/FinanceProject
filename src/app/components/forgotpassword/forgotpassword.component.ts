import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/app/services/admin.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router: Router, private data: Data) { }
  isButtonVisible=false;
  flag=true;
  ngOnInit(): void {
  }
  generateOTP=new FormGroup({
    phoneno:new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$"), Validators.maxLength(10), Validators.minLength(10)]),
  })
  checkOTP=new FormGroup({
    otp:new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$")]),
  })
  Generator(){
    this.isButtonVisible = true;
  }
  Check(){
    if(this.checkOTP.get('otp')?.value==this.generateOTP.get('phoneno')?.value%1000)
    {
      this.data.storage=this.generateOTP.get('phoneno')?.value;
    this.router.navigate(['changepassword']);}
    else{
      this.flag=false;
    }
  }
}
export class NameEditorComponent {
  phoneno = new FormControl('');
}