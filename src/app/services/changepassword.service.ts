import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { no } from '../API_LHnumber';
import { Consumer } from '../models/consumer';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})

export class ChangepasswordService {
  consumers:Consumer[]=[];
  constructor(private http: HttpClient) { }
  readonly ConnUrl = "https://localhost:" + no + "/api/Consumers"
  readonly ConnLogin = "https://localhost:" + no + "/api/LoginTables"
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
             const l = new Login(c.userName,c.cPassword)
             console.log(l)
             this.updateLogin(c.userName,l).forEach(element=>{})
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
  updateLogin(username:string, data:Login): Observable<any> {
    return this.http.put<Login[]>(this.ConnLogin+"/"+username,data,{
       headers:new HttpHeaders({
         'Content-Type':'application/json;charset=UTF-8',
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Method':'*'
       })
     });
   }
}
