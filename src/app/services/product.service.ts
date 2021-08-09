import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class DataProd {

  public pid: any;

  public constructor() { }

}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:Product[]=[];
  constructor(private http:HttpClient) { }
  reqProd:string="https://localhost:44353/api/Products"

  GetAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.reqProd,
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
