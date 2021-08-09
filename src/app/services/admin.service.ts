import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from '../models/consumer';

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

  //req:string="https://localhost:44327/api/Consumers";

  consumers:Consumer[]=[];

  consumer:Consumer=new Consumer(0,"","",new Date(),"","","","","","","","","",false);

  id:number=0;
  req:string="https://localhost:44353/api/Consumers"

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

  verifyConsumer(id:number, consumer:Consumer):Observable<Consumer>{
    this.consumer = consumer;
    console.log(id+ " "+this.consumer);
    return this.http.put<Consumer>(this.req+"/"+id,consumer,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  // updateUser(id:number,player:Player):Observable<any>
  // {
    
  //   return this.http.put<any>(this.req+"/"+id,player,{
  //     headers:new HttpHeaders({
  //       'Content-Type':'application/json;charset=UTF-8',
  //       'Access-Control-Allow-Origin':'*',
  //       'Access-Control-Allow-Method':'*'
  //     })
  //   });
  // }
  
  // Method to verify an existing player.
  // updateUser(consumer:any):Observable<Consumer[]>
  // {
    
  //   return this.http.put<Consumer[]>(this.req+"/"+,consumer,{
  //     headers:new HttpHeaders({
  //       'Content-Type':'application/json;charset=UTF-8',
  //       'Access-Control-Allow-Origin':'*',
  //       'Access-Control-Allow-Method':'*'
  //     })
  //   });
  // }
}
