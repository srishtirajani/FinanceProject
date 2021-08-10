import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from '../models/consumer';
import { EmiCard } from '../models/emicard';
import { Product } from '../models/product';
import { PurchaseRecord } from '../models/purchaseRecord';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  reqCons:string="https://localhost:44353/api/Consumers";
  reqPurchRec:string="https://localhost:44353/api/PurchaseRecords";
  reqProduct:string="https://localhost:44353/api/Products";
  reqEmiCard:string="https://localhost:44353/api/Emicards";

  consumers:Consumer[]=[];
  purchRecs:PurchaseRecord[]=[];
  products:Product[]=[];
  emicards:EmiCard[]=[];
  cPurchaseRec:PurchaseRecord[]=[];

  productColl1:any=new Map();
  productColl2:any=new Map();

  // productsPurchased:any;

  consumer:Consumer=new Consumer(0,"","",new Date(),"","","","","","","","","",false);

  id:number=0;

  GetAllConsumers():Observable<Consumer[]>{
    return this.http.get<Consumer[]>(this.reqCons,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }

  GetAllPurchRecs():Observable<PurchaseRecord[]>{
    return this.http.get<PurchaseRecord[]>(this.reqPurchRec,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }
  GetAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.reqProduct,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }
  GetAllEMICards():Observable<EmiCard[]>{
    console.log("hi");
    return this.http.get<EmiCard[]>(this.reqEmiCard,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }

  getEMICard(cid:number):any{
    for(let ec of this.emicards){
      if(ec.userId==cid){
        return ec;
      }
    }
  }

  getPurchRec(id:number):PurchaseRecord[]{
    for(let pr of this.purchRecs){
      if(pr.userId==id){
        this.cPurchaseRec.push(pr);
      }
    }
    return this.cPurchaseRec;
  }

  getId(userName?:string):number{
    for(let c of this.consumers){
      if(c.userName==userName){
        // console.log(c.cid);
        return c.cid;
      }
    }
    return 0;
  }

  getConsumer(id:number):Consumer{
    for(let c of this.consumers){
      if(c.cid==id){
        return c;
      }
    }
    return this.consumer;
  }

  fillCollection1(){
    for(let product of this.products){
      this.productColl1.set(product.pid, product.productName);
      // this.productColl2.set(product.pid, product.price);
    }
    return this.productColl1;
    // console.log(this.productColl1);
    // console.log(this.productColl2);
  }

  fillCollection2(){
    for(let product of this.products){
      // this.productColl1.set(product.pid, product.productName);
      this.productColl2.set(product.pid, product.price);
    }
    return this.productColl2;
    // console.log(this.productColl1);
    // console.log(this.productColl2);
  }

  constructor(private http:HttpClient) { }
}