import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createDirectiveDefinitionMap } from '@angular/compiler/src/render3/partial/directive';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { no } from '../API_LHnumber';
import { Consumer } from '../models/consumer';
import { EmiCard } from '../models/emicard';
import { Product } from '../models/product';
import { PurchaseRecord } from '../models/purchaseRecord';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  reqCons:string="https://localhost:" + no + "/api/Consumers"

  objC:any;

  consumer:Consumer=new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  emiCard = new EmiCard(0,'',0,new Date(),0,'');

  products:Product[]=[];

  productBought:any;

  consumers:Consumer[]=[];
  emicards:EmiCard[]=[];

  reqProdById:string="https://localhost:" + no + "/api/Products"
  reqEMIC:string="https://localhost:" + no + "/api/Emicards"
  reqPR:string="https://localhost:" + no + "/api/PurchaseRecords"
  
  constructor(private http:HttpClient) { 
    this.GetAllProducts().subscribe(data=>{
      this.products=data;
      // this.products=data;
      // console.log(this.products);
    });
   }

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

  GetAllEMICards():Observable<EmiCard[]>{
    return this.http.get<EmiCard[]>(this.reqEMIC,
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
    return this.http.get<Product[]>(this.reqProdById,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }

  GetProdById(id:number):Observable<any>
  {
    return this.http.get<any>(this.reqProdById+"/"+id,
    {
      headers:new HttpHeaders({
      'Content-Type':'text/plain;charset=UTF-8',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Method':'*'
      })
    }
  );
  }

  getProduct(pid:number){
    console.log(pid);
    console.log(this.products);
    for(let product of this.products){
      if(product.pid==pid){
        this.productBought=product;
        // return product
      }
      
    }
    console.log(this.productBought);
    return this.productBought;
  }

  getCardNo(cid:number):number{
    for(let card of this.emicards){
      if(card.userId==cid){
        this.emiCard=card;
        return card.eid;
      }
    }
    return 0;
  }

  getId(userName?:string):number{
    console.log("I am inside getID");
    console.log(userName);
    console.log(this.consumers);
    for(let c of this.consumers){
      if(c.userName==userName){
        this.objC=c;
        console.log(c.cid);
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

  pay(cid:number,price:number){
    let proFees:number=0.05*price;
    for(let card of this.emicards){
      if(card.userId==cid){
        if(card.accBalance>(price+proFees)){
          card.accBalance= Number.parseInt(card.totalCredit) - (price+proFees);
          console.log(card.userId);
          console.log(card.accBalance);
        }
      }
    }
  }

  

  // getEMICard(cid:number):any{
  //   for(let ec of this.emicards){
  //     if(ec.userId==cid){
  //       return ec;
  //     }
  //   }
  // }

  createPR(purchrec:PurchaseRecord):Observable<PurchaseRecord>
  {
    return this.http.post<PurchaseRecord>(this.reqPR,purchrec,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }
}
