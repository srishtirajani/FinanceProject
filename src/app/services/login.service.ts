import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logins:Login[]=[];

  constructor(private http:HttpClient) { }

  req:string="https://localhost:44353/api/LoginTables"
  reqCons:string="https://localhost:44353/api​/Consumers"

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

  login(uname:string, upass:string):boolean{
    for(let l of this.logins){
      if(l.userName==uname && l.uPassword==upass){
        return true;
      }
    }
    return false;
  }
}
