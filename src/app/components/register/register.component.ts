import { Component } from '@angular/core';
import { NgForm, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { Consumer } from 'src/app/models/consumer';
import { RegService } from 'src/app/services/reg.service';
import { LoginService } from 'src/app/services/login.service';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  consumers:Consumer[]=[];
  constructor (public service : RegService, private router:Router,public loginService:LoginService) {}

  banks = ['IDFC','HSBC','HDFC','ICICI']
  obj = new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  opw : string = "";
  card : string ="";
  flag : boolean = false;
  flag_email : boolean = true;
  flag_account : boolean = true;
  flag_username : boolean = true;
  flag_mobile : boolean = true;
  flagTerm : boolean = false;
  flagUnique:boolean=true;
  dob:Date=new Date();

  // msg:string="";
  ngOnInit(){
    this.loginService.GetAllConsumers().subscribe(data=>{
      this.loginService.consumers=data;
      this.consumers=data;
      console.log(this.consumers);
    });
  }
  radioClicked() {
    this.flag = true;
  }
  termClicked() {
    this.flagTerm = true;
  }
  terms(){
    open("/terms");
  }
  onSubmit(form:NgForm) {
    this.flagUnique=true;
    this.flag_mobile=true
    this.flag_username=true
    this.flag_email = this.flag_account = true
    for(let c of this.consumers){
      if(c.emailId==form.form.value.email){
        this.flagUnique=false;
        this.flag_email=false;
        //alert("Email already exists!");
        break;
      }
      if(c.userName==form.form.value.username){
        this.flagUnique=false;
        this.flag_username=false;
        //alert("Username already exists!");
        break;
      }
      if(c.accNo==form.form.value.savingsAccount){
        this.flagUnique=false;
        this.flag_account=false;
        //alert("Account already exists!");
        break;
      }
      if(c.phoneNumber==form.form.value.phone){
        this.flagUnique=false;
        this.flag_mobile=false
        alert("Phone number already exists!");
        break;
      }
    }
    console.log(form.form.value.dob);
    console.log(new Date(form.form.value.dob))
    console.log(new Date());
    console.log(formatDate(new Date(), 'yyyy-MM-dd', 'en-us'));
    if(form.form.value.dob==formatDate(new Date(), 'yyyy-MM-dd', 'en-us')){
      console.log("inside if");
      this.flagUnique=false;
        alert("Enter a valid date!");
    }

    if(this.flagUnique){
    this.service.postReg().subscribe(
      res => {this.router.navigate(['login'])},
      err => {console.log(err);}
    );
  }


  }

  // onSubmit(form:NgForm):void
  // {
  //   this.service.createUser(form).subscribe(data=>{
  //   this.msg="Successfully created "+data.cName;
  //   //Logging the response received from web api.
  //   console.log(data);
  //   })
  // }

  changeDOB(event:any){
    console.log(event);
    this.dob=event;
    console.log(this.dob);
  }

}



