import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { no } from '../API_LHnumber';

@Injectable({
  providedIn: 'root'
})

export class UploadImageService {

  reqCons:string="https://localhost:" + no + "/api/Documents";

  constructor(private http : HttpClient) { }
 
  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.reqCons, formData);
  }
}
