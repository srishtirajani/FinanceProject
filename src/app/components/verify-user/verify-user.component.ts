import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consumer } from 'src/app/models/consumer';
import { MailSettings } from 'src/app/models/email';
import { EmiCard } from 'src/app/models/emicard';
import { AdminService, Data } from 'src/app/services/admin.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  flag_verify:string='';
  
  consumer:Consumer=new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  
  userName:any;

  emiCards:EmiCard[]=[];
  newEmiCard:EmiCard=new EmiCard(0,'',0,new Date(),0,'')

  constructor(private aService:AdminService, private router:Router) { }

  ngOnInit(): void {
    this.userName=localStorage.getItem("userName");
    // this.aService.GetAllEMICards().subscribe(data=>{
    //   this.aService.emiCards=data;
    //   this.emiCards=data;      
    //   this.emicard=this.cService.getEMICard(this.id);
    //   this.totalcreds=Number(this.emicard.totalCredit);
    // });
  }

  createEMICard(data:any):void
  {
    this.aService.assignNewCard(data).subscribe(data=>{
    console.log("Successfully created ");
    //Logging the response received from web api.
    console.log(data);
    });
  }

  verifyConsumerCheck(){
    this.flag_verify="verified";
    localStorage.setItem('flag_verify',this.flag_verify);
    console.log(this.consumer.isVerfied);
    let id:number=this.aService.getId(this.userName);
    this.consumer=this.aService.getConsumer(id);
    
    if(!this.consumer.isVerfied){
      this.consumer.isVerfied = true
    }
    this.aService.verifyConsumerCheck(id,this.consumer).forEach(element=>{});
    //hard coding the totalCredit
    if(this.consumer.cardType=='Gold'){
      this.newEmiCard.totalCredit = '249500'; 
      this.newEmiCard.validityPeriod=new Date(new Date().getFullYear() + 3, new Date().getMonth(), new Date().getDate());
    }
    else{
      this.newEmiCard.totalCredit = '499250'; 
      this.newEmiCard.validityPeriod=new Date(new Date().getFullYear() + 5, new Date().getMonth(), new Date().getDate())
    }     
    this.newEmiCard.accBalance = Number(this.newEmiCard.totalCredit);
    this.newEmiCard.userId=id;
    console.log(this.newEmiCard);
    this.createEMICard(this.newEmiCard);
    this.router.navigate(['admin']);
  }

}
