import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consumer } from 'src/app/models/consumer';
import { Documents } from 'src/app/models/Document';
import { EmiCard } from 'src/app/models/emicard';
import { AdminService, Data } from 'src/app/services/admin.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  d_msg:string="";
  userName:any;
  id:number=0;
  eid:number=0;
  consumers:Consumer[]=[];
  documents:Documents[]=[];
  // emiCards:EmiCard[]=[];

  constructor(private aService:AdminService, private aServiceErr:AdminService ,private router: Router, private data: Data, private docService:DocumentService) {
    
  }

  ngOnInit(): void {

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    this.aService.showAllConsumers().subscribe(data=>{
      this.aService.consumers=data;
      this.consumers=data;
    });
    this.aService.GetAllEMICards().subscribe(data=>{
      this.aService.emiCards=data;
      // this.emiCards=data;
    });
    this.userName=localStorage.getItem('userName');
  }
  
  toVerify(uname:string){
    // this.data.storage=this.consumers;
    localStorage.setItem("userName",uname)
    this.router.navigate(['verify',{consumer:this.consumers}]);
  }

  deleteUser(uname:string){
    // debugger;
    this.id = this.aService.getId(uname);
    console.log(this.id);
    this.eid = this.aService.getCardNo(this.id);
    console.log(this.eid);
    // debugger;
    this.aService.deleteLogin(uname).subscribe(data=>{
      console.log("Calling the delete login record from service")
      this.d_msg="Successfully deleted record from login table with username: "+uname;
      console.log(data);
    });
    this.deleteUser_API(this.id, this.eid);
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
  

  deleteUser_API(id:number, eid:number){
    console.log("Inside delete emi card.")
    // console.log(this.userName);
    
    // this.aService.deleteEMICard(eid).subscribe(data=>{
    //   this.d_msg="Successfully deleted emi card with card id: "+id;
    //   console.log(data);
    // });

    //try
    // this.aService.GetAllEMICards().subscribe(data=>{
    //   this.aService.emiCards=data;
    //   this.emiCards=data;
    // });

    this.aService.deleteConsumer(id).subscribe(data=>{
      this.d_msg="Successfully deleted consumer with eid: "+id;
      console.log(data);
    });

    //try
    // this.aService.showAllConsumers().subscribe(data=>{
    //   this.aService.consumers=data;
    //   this.consumers=data;
    // });
  }
  showDocs(){
    this.docService.GetAllDocuments().subscribe(data=>{
      this.documents=data;
    });
  }
  
}
