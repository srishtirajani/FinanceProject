import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from '../models/consumer';

@Injectable({
  providedIn: 'root'
})
export class DataC {

  public storage: any;

  public constructor() { }

}
export class ChangepasswordService {
  consumers:Consumer[]=[];
  constructor(private http: HttpClient) { }
  readonly ConnUrl = 'https://localhost:44327/api/Consumers'
  GetAllConsumers():Observable<Consumer[]>{
    return this.http.get<Consumer[]>(this.ConnUrl,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }
  public getValues(phoneNumber:string,newpassword:string,cons:any):string{
    for(let c of cons){
          if(c.phoneNumber==phoneNumber){
            c.cPassword = newpassword
             this.updateConsumer(c.cid,c).forEach(element=>{})
            return "valid";
          }
         }
    return "invalid";
  }
 updateConsumer(id:number, data:Consumer): Observable<any> {
   return this.http.put<Consumer[]>(this.ConnUrl+"/"+id,data,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
} 
 