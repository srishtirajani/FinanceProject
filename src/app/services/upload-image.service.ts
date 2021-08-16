import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { no } from '../API_LHnumber';
import { Dbimg } from '../models/Dbimg';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  reqCons:string="https://localhost:44327/api/Documents";
  constructor(private http : HttpClient) { }
 
postFile( fileToUpload: File) {
  const formData: FormData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
  console.log(fileToUpload,formData);
  return this.http.post(this.reqCons, formData);
}
}
