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
  // id:number=0;
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
  // products:Product[]=[]
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
      // this.products=data;
      // console.log(this.products);
    });
  }

  insertPR(data:any):void
  {
    this.productService.createPR(data).subscribe(data=>{
    console.log("Successfully created ");
    //Logging the response received from web api.
    console.log(data);
    })
  }

  conditionCheck(){
    console.log(this.userName);
    let cid=this.productService.getId(this.userName);
    console.log(cid);
    this.consumer=this.productService.getConsumer(cid);
    this.prodInfoService.getCardNo(cid);
    this.emiCard=this.prodInfoService.emiCard;
    console.log(this.pid);
    
    console.log(this.prodInfoService.getProduct(this.pid));
    this.product=this.prodInfoService.getProduct(this.pid);
    console.log(this.product);
    
    // console.log(this.product);
    // this.productService.GetProdById(this.pid).subscribe(data=>{
    //   this.product=data;
    // });
    
    console.log(this.consumer);
    console.log(this.emiCard);
    // console.log(this.product);
    // console.log(this.product.price);
    
    if(this.consumer.isVerfied==true){
      this.flag_card=true;
      this.count_card=1;
    }
    console.log("flag_card:" + this.flag_card)
    if(this.product.price<this.emiCard.accBalance){
      this.flag_isbalance=true;
      this.count_isbalance=1;
      // console.log(this.emiCard.validityPeriod > this.datePipe.transform(new Date(), 'yyyy-MM-dd') ? true : false)
      // console.log(this.emiCard.validityPeriod.getTime());
      // var date1 = this.emiCard.validityPeriod;
      // var date2 = new Date();
      // console.log(typeof(date1));
      // console.log(date2.getTime());
      // var Difference_In_Time = (this.emiCard.validityPeriod).getTime() - new Date().getTime();
      // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      // console.log(Difference_In_Days);
    }
    console.log("flag_isbalance:" + this.flag_isbalance);
    let exp = this.emiCard.validityPeriod
    let vDate = this.datePipe.transform(exp, 'yyyy-MM-dd')||''
    let cDate= this.datePipe.transform(new Date(), 'yyyy-MM-dd')||''
    console.log(vDate)
    console.log(cDate)
    if(vDate > cDate){
      this.flag_valid = true;
      this.count_valid = 1;
    }
    console.log("flag_valid:" + this.flag_valid);
    if(this.count_valid==1 && this.count_isbalance==1 && this.count_card==1){
      this.count=1;
    }
    // console.log("flag_card:" + this.flag_card + "flag_isbalance:" + this.flag_isbalance + "flag_valid:" + this.flag_valid);
  }

  Payment(){
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0! 
    // var yyyy = today.getFullYear();
    // today = mm + '/' + dd + '/' + yyyy;
    var today = new Date(); 
    this.pay.storage=this.product;
    let id:number=this.productService.getId(this.userName);
    console.log(id);
    //call the condition methods
    // this.conditionCheck();
    this.productService.pay(id, this.product.price);
    // this.purchRec.DOP=(new Date().getMonth()+1)+'-'+(new Date().getDate())+'-'+(new Date().getFullYear()); 
    this.purchRec.cardNo=this.productService.getCardNo(id);
    this.purchRec.productBalance=this.product.price-(this.product.price/this.selectedEmi.value);
    this.purchRec.productId=this.product.pid;
    this.purchRec.totalMonthsSelected=this.selectedEmi.value;
    this.purchRec.userId=id;
    //sending productRecord to payment
    this.dataC.storage=this.purchRec
    console.log(this.purchRec);
    this.purchRec.latestEmimonth=new Date().getMonth(); //the month of purchase
    console.log(this.purchRec.latestEmimonth);
    this.insertPR(this.purchRec); //inserting the current purch Rec in Purchase Records Table
    //update account balance
    this.emicardU = this.consumerservice.getEMICard(id);
    console.log(this.emicardU)
    this.consumerservice.getEMIValues(id,this.product.price,this.emicardU);
    this.router.navigate(['payment']);
  }
}
  

