import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumer } from '../models/consumer';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {
  consumers:Consumer[]=[];
  c:any;
  constructor(private http: HttpClient) { }
      cid1 : number =0;
      userId1 : string = '';
      cName1 : string='';
      DOB1: Date | undefined;
     emailId1 : string='';
      phoneNumber1 : string=''
      userName1 : string='';
      cAddress1 : string='';
      cPassword1 : string='';
      cardType1 : string='';
      bankName1 : string='';
      accNo1 : string='';
      ifscCode1 : string='';
      isVerfied1 : boolean = false;
  readonly ConnUrl = 'https://localhost:44353/api/Consumers/UpdateConsumerDetails'
  reqCons:string="https://localhost:44353/api/Consumers"
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
  public getValues(phoneNumber:string,newpassword:string):string{
    for(let c of this.consumers){
      console.log('in for')
          if(c.phoneNumber==phoneNumber){
            console.log("in");
            console.log(c.cid);
            this.cid1 = c.cid;
            this.userId1 = c.userId;
            this.cName1 = c.cName;
            this.DOB1 = c.DOB;
            this.emailId1 = c.emailId;
            this.phoneNumber1 = c.phoneNumber;
            this.userName1 = c.userName;
            this.cAddress1 = c.cAddress;
            this.cPassword1 = newpassword;
            this.cardType1 = c.cardType;
            this.bankName1 = c.bankName;
            this.accNo1 = c.accNo;
            this.ifscCode1 = c.ifscCode;
            this.isVerfied1 = c.isVerfied;
            this.c = new Consumer(this.cid1,this.userId1,this.cName1,this.DOB1,this.emailId1,this.phoneNumber1,this.userName1,this.cAddress1,this.cPassword1,this.cardType1,this.bankName1,this.accNo1,this.ifscCode1,this.isVerfied1);
            console.log(this.c);
            this.updateConsumer(this.cid1,this.c)
            return "valid";
          }
        }
    return "invalid";
  }
  updateConsumer(id:number, data:Consumer): Observable<any> {
    console.log("hi");
    console.log(id);
    console.log(data);
      //return this.http.put<any>(this.reqCons, data)   
    return this.http.put<Consumer[]>('https://localhost:44353/api/Consumers/UpdateConsumerDetails/10003',data,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
}
 // https://localhost:44353/api/Consumers/UpdateConsumerDetails?id=10001

  /* updateConsumer(consumer:any):Observable<Consumer[]>
  {
    
    return this.http.put<Consumer[]>(this.ConnUrl+"/"+this.cid1,consumer,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }
} */
  /* updateConsumer(consumer: Consumer): Observable<Consumer> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Consumer>(this.ConnUrl + '/UpdateConsumerDetails/',  
    consumer, httpOptions);  
  }  
formData : Consumer = new Consumer(0,"","",new Date(),"","","","","","","","","",false);
  postReg() {
    return this.http.post(this.ConnUrl,this.formData)
  }
} */
/*  updateTutorial(): void {
    this.changepassword.updateConsumer()
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The tutorial was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }
 */
 