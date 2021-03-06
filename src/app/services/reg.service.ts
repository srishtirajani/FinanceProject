import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Consumer } from '../models/consumer';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { no } from '../API_LHnumber';

@Injectable({
  providedIn: 'root'
})
export class RegService {

  consumers:Consumer[]=[];

  constructor(private http : HttpClient) { }

  formData : Consumer = new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  readonly ConnUrl = 'https://localhost:' + no + '/api/Consumers'

  postReg() {
    return this.http.post(this.ConnUrl,this.formData)
  }
}


