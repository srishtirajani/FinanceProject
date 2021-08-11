import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { no } from '../API_LHnumber';
import { AdminControls } from '../models/admin';
import { Consumer } from '../models/consumer';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logins:Login[]=[];
  consumers:Consumer[]=[];
  admins:AdminControls[]=[];

  constructor(private http:HttpClient) { }

  req:string="https://localhost:" + no + "/api/LoginTables"
  reqCons:string="https://localhost:" + no + "/api/Consumers"
  reqAdmin:string="https://localhost:" + no + "/api/AdminControls"

  GetAllLogins():Observable<Login[]>{
    return this.http.get<Login[]>(this.req,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
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

  GetAllAdmins():Observable<AdminControls[]>{
    return this.http.get<AdminControls[]>(this.reqAdmin,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }

  login(uname:string, upass:string):string{

    for(let l of this.logins){
      if(l.userName==uname && l.uPassword==upass){
        for(let c of this.consumers){
          if(c.userName==uname && c.cPassword==upass){
            return "consumer";
          }
        }
        for(let a of this.admins){
          if(a.userName==uname && a.aPassword==upass){
            return "admin";
          }
        }
      }
    }
    return "invalid";
  }
}
