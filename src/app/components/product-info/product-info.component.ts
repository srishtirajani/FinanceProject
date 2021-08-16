import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductInfoService } from 'src/app/services/product-info.service';
import { DataProd } from 'src/app/services/product.service';
import { AdminService, Data } from 'src/app/services/admin.service';
import { PurchaseRecord } from 'src/app/models/purchaseRecord';
import { DatePipe } from '@angular/common';
import { Consumer } from 'src/app/models/consumer';
import { EmiCard } from 'src/app/models/emicard';
import { DataC } from 'src/app/services/data-storage.service';
import { ConsumerService } from 'src/app/services/consumer.service';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
  providers:[DatePipe]
})
export class ProductInfoComponent implements OnInit {

  userName:any;
  flag_card:boolean=false;
  flag_valid:boolean=false;
  flag_isbalance:boolean=false;
  count_card=0
  count_valid=0
  count_isbalance=0
  count=0
  consumer = new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  emiCard = new EmiCard(0,'',0,new Date(),0,'');
  
  myDate:any;
  id:number=0;

  purchRec:PurchaseRecord=new PurchaseRecord(0,'',0,0,0,new Date(),0,0,0);

  pid:number=this.data.pid;
  product:Product=new Product(0,'','',0,'');
 
  emi:number=0;
  selectedEmi:any;

  emiPeriod: any=[
    {name: '3 Months', value: 3}, 
    {name: '6 Months', value: 6}, 
    {name: '9 Months', value: 9}, 
    {name: '1 Year', value: 12}
  ];
  emicardU: any;

  constructor(private productService:ProductInfoService, private router:Router,private data: DataProd,private pay:Data, private datePipe: DatePipe, private prodInfoService:ProductInfoService, private aService:AdminService, private dataC:DataC,private consumerservice:ConsumerService){
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
}

  
  ngOnInit(): void { 
    this.userName=localStorage.getItem('userName');
    this.productService.GetProdById(this.pid).subscribe(data=>{
    this.product=data;
    });
    this.productService.GetAllConsumers().subscribe(data=>{
      this.productService.consumers=data;
    });
    this.productService.GetAllEMICards().subscribe(data=>{
      this.productService.emicards=data;
      this.selectedEmi = new Object();
      this.conditionCheck();
    });
    this.productService.GetAllProducts().subscribe(data=>{
      this.prodInfoService.products=data;
    });
  }

  insertPR(data:any):void
  {
    this.productService.createPR(data).subscribe(data=>{
    })
  }

  conditionCheck(){

    let cid=this.productService.getId(this.userName);

    this.consumer=this.productService.getConsumer(cid);
    this.prodInfoService.getCardNo(cid);
    this.emiCard=this.prodInfoService.emiCard;

    this.product=this.prodInfoService.getProduct(this.pid);
   
    if(this.consumer.isVerfied==true){
      this.flag_card=true;
      this.count_card=1;
    }

    if(this.product.price<this.emiCard.accBalance){
      this.flag_isbalance=true;
      this.count_isbalance=1;
 
    }
    let exp = this.emiCard.validityPeriod
    let vDate = this.datePipe.transform(exp, 'yyyy-MM-dd')||''
    let cDate= this.datePipe.transform(new Date(), 'yyyy-MM-dd')||''
    
    if(vDate > cDate){
      this.flag_valid = true;
      this.count_valid = 1;
    }

    if(this.count_valid==1 && this.count_isbalance==1 && this.count_card==1){
      this.count=1;
    }
    
  }

  Payment(){
  
    var today = new Date(); 
    this.pay.storage=this.product;
    let id:number=this.productService.getId(this.userName);
  
    this.productService.pay(id, this.product.price);
    
    this.purchRec.cardNo=this.productService.getCardNo(id);
    this.purchRec.productBalance=this.product.price-(this.product.price/this.selectedEmi.value);
    this.purchRec.productId=this.product.pid;
    this.purchRec.totalMonthsSelected=--this.selectedEmi.value;
    this.purchRec.userId=id;
    this.dataC.storage=this.purchRec
    this.purchRec.latestEmimonth=new Date().getMonth(); 
    this.insertPR(this.purchRec); 
    this.emicardU = this.consumerservice.getEMICard(id);
    this.consumerservice.getEMIValues(id,this.product.price,this.emicardU);
    this.router.navigate(['payment']);
  }
  terms(){
    open("/terms-index");
  }
}
  

