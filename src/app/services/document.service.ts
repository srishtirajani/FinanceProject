import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { no } from '../API_LHnumber';
import { Documents } from '../models/Document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents:Documents[]=[];

  constructor(private http:HttpClient) { }

  reqProd:string='https://localhost:' + no + '/api/Documents'

  GetAllDocuments():Observable<Documents[]>{
    return this.http.get<Documents[]>(this.reqProd,
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
