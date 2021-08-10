import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductInfoService } from 'src/app/services/product-info.service';
import { DataProd } from 'src/app/services/product.service';
import { AdminService, Data } from 'src/app/services/admin.service';
import { PurchaseRecord } from 'src/app/models/purchaseRecord';
import { DatePipe } from '@angular/common';
import { Consumer } from 'src/app/models/consumer';

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

  consumer = new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  
  myDate:any;

  purchRec:PurchaseRecord=new PurchaseRecord(0,'',0,0,0,new Date(),0,0);

  pid:number=this.data.pid;
  product:any;
  emi:number=0;
  selectedEmi:any;

  emiPeriod: any=[
    {name: '3 Months', value: 3}, 
    {name: '6 Months', value: 6}, 
    {name: '9 Months', value: 9}, 
    {name: '1 Year', value: 12}
  ];

  constructor(private productService:ProductInfoService, private router:Router,private data: DataProd,private pay:Data, private aService:AdminService, private datePipe: DatePipe){
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
    });
    this.selectedEmi = new Object();
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
    let id:number=this.productService.getId(this.userName);

    // if(this.co)
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
    this.productService.pay(id, this.product.price);
    // this.purchRec.DOP=(new Date().getMonth()+1)+'-'+(new Date().getDate())+'-'+(new Date().getFullYear()); 
    this.purchRec.cardNo=this.productService.getCardNo(id);
    this.purchRec.productBalance=this.product.price-(this.product.price/this.selectedEmi.value);
    this.purchRec.productId=this.product.pid;
    this.purchRec.totalMonthsSelected=this.selectedEmi.value--;
    this.purchRec.userId=id;
    console.log(this.purchRec);
    this.insertPR(this.purchRec);
    this.router.navigate(['payment']);
  }
}
  

