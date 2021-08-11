import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { no } from '../API_LHnumber';
import { Consumer } from '../models/consumer';
import { EmiCard } from '../models/emicard';
import { Product } from '../models/product';
import { PurchaseRecord } from '../models/purchaseRecord';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  reqCons:string="https://localhost:" + no + "/api/Consumers";
  reqPurchRec:string="https://localhost:" + no + "/api/PurchaseRecords";
  reqProduct:string="https://localhost:" + no + "/api/Products";
  reqEmiCard:string="https://localhost:" + no + "/api/Emicards";

  consumers:Consumer[]=[];
  purchRecs:PurchaseRecord[]=[];
  products:Product[]=[];
  emicards:EmiCard[]=[];
  cPurchaseRec:PurchaseRecord[]=[];

  productColl1:any=new Map();
  productColl2:any=new Map();

  // productsPurchased:any;

  consumer:Consumer=new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  purchRec:PurchaseRecord=new PurchaseRecord(0,'',0,0,0,new Date(),0,0,0);

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
    console.log(this.purchRecs)
    // console.log(this.purchRecs[0])
    for(let pr of this.purchRecs){
      if(pr.userId==id){
        this.cPurchaseRec.push(pr);
        console.log(pr.cardNo);
        console.log(pr.LatestEMImonth);
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

  public getEMIValues(userId:number,price:number,emicard:EmiCard)
  {
    console.log(userId)
    
      emicard.accBalance = emicard.accBalance - (price*1.05);
      console.log(emicard)
      this.updateEMICard(emicard.eid,emicard).forEach(element=>{})
  }

  updateEMICard(id:number, data:EmiCard): Observable<any> {
    return this.http.put<any>(this.reqEmiCard+"/"+id,data,{
       headers:new HttpHeaders({
         'Content-Type':'application/json;charset=UTF-8',
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Method':'*'
       })
     });
   }

  constructor(private http:HttpClient) { 
    this.GetAllPurchRecs().subscribe(data=>{
      this.purchRecs=data;
      console.log(this.purchRecs);
      // this.purchRecs=data;
      // this.cPurchaseRecord=this.cService.getPurchRec(this.id);
    });
  }

  payMonthlyEMI(prid:number, purchRec:PurchaseRecord):Observable<any>{
    this.purchRec = purchRec;
    return this.http.put<any>(this.reqPurchRec+"/"+prid,purchRec,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    })
  }
}
