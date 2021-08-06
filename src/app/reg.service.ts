import { Injectable } from '@angular/core';
import { Consumer } from './models/consumer';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegService {

  constructor(private http : HttpClient) { }

  formData : Consumer = new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  readonly ConnUrl = 'https://localhost:44327/api/Consumers'

  postReg() {
    return this.http.post(this.ConnUrl,this.formData)
  }
}
