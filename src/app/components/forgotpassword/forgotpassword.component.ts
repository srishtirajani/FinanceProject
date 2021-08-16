import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consumer } from 'src/app/models/consumer';
import { Data } from 'src/app/services/admin.service';
import { ChangepasswordService } from 'src/app/services/changepassword.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router: Router, private data: Data, private changepassword:ChangepasswordService) { }
  isButtonVisible=false;
  flag=true;
  emailpresent=true;
  con:Consumer[]=[];
  ngOnInit(): void {
    this.changepassword.GetAllConsumers().subscribe(data=>{
      this.changepassword.consumers=data;
      this.con = this.changepassword.consumers;
    });
    console.log(this.con)
  }
  generateOTP=new FormGroup({
    phoneno:new FormControl("",[]),
  })
  checkOTP=new FormGroup({
    otp:new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$")]),
  })
  // Generator(){
  //   this.isButtonVisible = true;
  // }
  Generator(){
    let email = this.generateOTP.get('phoneno')?.value
    let f = this.changepassword.emailexists(email,this.con)
    if(f){
      this.isButtonVisible = true;
      this.emailpresent=true;
      
    }
    else{
      this.emailpresent=false;
    }
  }
  Check(){
    console.log("OTP:"+this.changepassword.otp)
    if(this.checkOTP.get('otp')?.value==this.changepassword.otp)
    {
      this.flag=true;
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