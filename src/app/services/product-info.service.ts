import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createDirectiveDefinitionMap } from '@angular/compiler/src/render3/partial/directive';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Consumer } from '../models/consumer';
import { EmiCard } from '../models/emicard';
import { Product } from '../models/product';
import { PurchaseRecord } from '../models/purchaseRecord';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  reqCons:string="https://localhost:44353/api/Consumers"

  objC:any;

  product:Product[]=[];

  consumers:Consumer[]=[];
  emicards:EmiCard[]=[];

  reqProdById:string="https://localhost:44353/api/Products"
  reqEMIC:string="https://localhost:44353/api/Emicards"
  reqPR:string="https://localhost:44353/api/PurchaseRecords"
  
  constructor(private http:HttpClient) { }

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

  getId(userName?:string):number{
    for(let c of this.consumers){
      if(c.userName==userName){
        this.objC=c;
        return c.cid;
      }
    }
    return 0;
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

  getCardNo(cid:number):number{
    for(let card of this.emicards){
      if(card.userId==cid){
        return card.eid;
      }
    }
    return 0;
  }

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
