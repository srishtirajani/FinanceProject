import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { no } from '../API_LHnumber';
import { Dbimg } from '../models/Dbimg';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  reqCons:string="https://localhost:44327/api/Dbimgs";
  constructor(private http : HttpClient) { }
  postFile(db:Dbimg): Observable<any> {
    
    const formData: FormData = new FormData();
    //formData.append('myFile', blob);
    //formData.append('username',username);
    console.log(db);
    return this.http.post<any>(this.reqCons,db );
}
}
