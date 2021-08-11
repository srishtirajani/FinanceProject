import { createPipeDefinitionMap } from '@angular/compiler/src/render3/partial/pipe';
import { Component, OnInit } from '@angular/core';
import { Consumer } from 'src/app/models/consumer';
import { EmiCard } from 'src/app/models/emicard';
import { Product } from 'src/app/models/product';
import { PurchaseRecord } from 'src/app/models/purchaseRecord';
import { ConsumerService } from 'src/app/services/consumer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  month:number=0;

  userName:any;
  id:number=0;
  totalcreds:number=0;

  consumers:Consumer[]=[];
  purchRecs:PurchaseRecord[]=[];
  products:Product[]=[];
  emicards:EmiCard[]=[];
  cPurchaseRecord:PurchaseRecord[]=[];


  consumer:Consumer=new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  emicard:EmiCard=new EmiCard(0,'NA',0,new Date(),0,'');
  purchRec:PurchaseRecord=new PurchaseRecord(0,'',0,0,0,new Date(),0,0,0);

  productColl1:any=new Map();
  productColl2:any=new Map();
  productColl3:any=new Map();
  productColl4:any=new Map();

  showPurch:boolean = true

  counter : number = 0;
  showMoreList:number[] = []
  storeBal:number[] = []

  showMore() {
    if(this.cPurchaseRecord.length > this.counter) {
      this.showMoreList.push((this.cPurchaseRecord[this.counter]).productId)
      this.counter = this.counter+1;
    }
      
  }
//   refresh(): string {
//     window.location.reload();
//     return 'done';
// }

  constructor(private cService:ConsumerService) { }

  ngOnInit(): void {

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.userName=localStorage.getItem('userName');
    this.cService.GetAllConsumers().subscribe(data=>{
      this.cService.consumers=data;
      this.consumers=data;
      this.id=this.cService.getId(this.userName);
      this.consumer=this.cService.getConsumer(this.id);
    });
    this.cService.GetAllPurchRecs().subscribe(data=>{
      //this.cService.purchRecs=data;
       //this.purchRecs=data;
      this.cPurchaseRecord=this.cService.getPurchRec(this.id);
      console.log(this.cPurchaseRecord);
      this.month=(new Date().getMonth());  //+1 month here to test
    });
    this.cService.GetAllProducts().subscribe(data=>{
      this.cService.products=data;
      this.products=data;
      this.productColl1=this.cService.fillCollection1();
      console.log(this.productColl1);
      this.productColl2=this.cService.fillCollection2();
      console.log(this.productColl2);
      this.productColl3=this.productColl1;
      this.productColl4=this.productColl2;
    });
    this.cService.GetAllEMICards().subscribe(data=>{
      this.cService.emicards=data;
      this.emicards=data;      
      this.emicard=this.cService.getEMICard(this.id);
      this.totalcreds=Number(this.emicard.totalCredit);
    });
  }

  // showData(latestmonth:number){
  //   // this.cService.fillCollections();
  //   console.log(this.month);
  //   console.log(latestmonth);
  //   console.log(this.id+" "+this.userName);
  //   console.log(this.emicard);
  //   for(let x of this.cPurchaseRecord){
  //     console.log(x.latestEmimonth);
  //   }
  // }

  payEMI(prid:number){
    for(let cpr of this.cPurchaseRecord){
      if(cpr.prid==prid){
        this.purchRec=cpr;
      }
    }
    this.purchRec.latestEmimonth=(new Date().getMonth());  //+1 month here to test
    this.purchRec.productBalance=this.purchRec.productBalance-(this.purchRec.productBalance/this.purchRec.totalMonthsSelected);
    this.purchRec.totalMonthsSelected=--this.purchRec.totalMonthsSelected;
    this.cService.payMonthlyEMI(prid, this.purchRec).forEach(element=>{});
  }
}