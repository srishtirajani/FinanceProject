import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { no } from '../API_LHnumber';
import { Consumer } from '../models/consumer';
import { EmiCard } from '../models/emicard';

@Injectable({
  providedIn: 'root'
})
export class Data {

  public storage: any;

  public constructor() { }

}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  reqEmiCards:string="https://localhost:" + no + "/api/Emicards"
  reqLogins:string="https://localhost:" + no + "/api/LoginTables"
  reqEmail:string="https://localhost:" + no + "​/api​/Email​/Send"

  consumers:Consumer[]=[];
  emiCards:EmiCard[]=[];

  consumer:Consumer=new Consumer(0,"","",new Date(),"","","","","","","","","",false);

  id:number=0;

  req:string="https://localhost:"+ no +"/api/Consumers";


  showAllConsumers():Observable<Consumer[]>{
    return this.http.get<Consumer[]>(this.req,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }

  showConsumerById(id:number):Observable<any>{
    console.log(this.req+'/'+id)
    return this.http.get<any>(this.req+'/'+id,
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
    return this.http.get<EmiCard[]>(this.reqEmiCards,
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

  getCardNo(cid:number):any{
    console.log("Inside getCardNo");
    for(let ec of this.emiCards){
      console.log("Inside for loop of emi cards");
      if(ec.userId==cid){
        console.log("User id matched in the emi card table");
        console.log("Card no: "+ec.eid);
        return ec.eid;
      }
    }
  }

  verifyConsumerCheck(id:number, consumer:Consumer):Observable<any>{
    this.consumer = consumer;
    return this.http.put<any>(this.req+"/"+id,consumer,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    })
  }

  assignNewCard(emiCard:EmiCard):Observable<EmiCard>
  {
    return this.http.post<EmiCard>(this.reqEmiCards,emiCard,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  deleteConsumer(id:number){
    return this.http.delete<any>(this.req+"/"+id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  deleteEMICard(eid:number){
    console.log("Inside delete emi card method")
    return this.http.delete<any>(this.reqEmiCards+"/"+eid,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  deleteLogin(uname:string){
    console.log("Inside delete login method")
    return this.http.delete<any>(this.reqLogins+"/"+uname,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }  
}
