import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {
  product:Product[]=[];

  reqProdById:string="https://localhost:44327/api/Products"
  
  constructor(private http:HttpClient) { }

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
}
