import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consumer } from 'src/app/models/consumer';
import { AdminService, Data } from 'src/app/services/admin.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {
  
  consumer:Consumer=new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  // data:any;

  // isVerfied:any;

  userName:any;

  constructor(private aService:AdminService, private router:Router) { }

  ngOnInit(): void {
    this.userName=localStorage.getItem("userName");
    // console.log(this.router.snapshot.params);
    // this.data=this.router.snapshot.params;
    // console.log(this.userName);
  }

  verifyConsumer(){
    console.log(this.consumer.isVerfied);
    let id:number=this.aService.getId(this.userName);
    // console.log(id);
    this.consumer=this.aService.getConsumer(id);
    
    if(!this.consumer.isVerfied){
      this.consumer.isVerfied = true
    }
    console.log(this.consumer);
    this.aService.verifyConsumer(id, this.consumer);
    this.router.navigate(['admin']);
  }

}
