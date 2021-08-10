import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Consumer } from '../models/consumer';
import { EmiCard } from '../models/emicard';
// import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Data {

  public storage: any;

  public constructor() { }

}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  req:string="https://localhost:44353/api/Consumers";
  reqEmiCards:string="https://localhost:44353/api/Emicards"

  consumers:Consumer[]=[];
  // emiCards:EmiCard[]=[];

  consumer:Consumer=new Consumer(0,"","",new Date(),"","","","","","","","","",false);

  id:number=0;
  // req:string="https://localhost:44353/api/Consumers"

  showAllConsumers():Observable<Consumer[]>{
    return this.http.get<Consumer[]>(this.req,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }

  // GetAllEMICards():Observable<EmiCard[]>{
  //   console.log("hi");
  //   return this.http.get<EmiCard[]>(this.reqEmiCards,
  //     {
  //       headers:new HttpHeaders({
  //       'Content-Type':'text/plain;charset=UTF-8',
  //       'Access-Control-Allow-Origin':'*',
  //       'Access-Control-Allow-Method':'*'
  //       })
  //     }
  //   );
  // }

  getId(userName?:string):number{
    for(let c of this.consumers){
      if(c.userName==userName){
        return c.cid;
      }
    }
    return 0;
  }

  getConsumer(id:number):Consumer{
    for(let c of this.consumers){
      if(c.cid==id){
        return c;
      }
    }
    return this.consumer;
  }

  verifyConsumerCheck(id:number, consumer:Consumer):Observable<any>{
    this.consumer = consumer;
    return this.http.put<any>(this.req+"/"+id,consumer,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    })
  }

  assignNewCard(emiCard:EmiCard):Observable<EmiCard>
  {
    return this.http.post<EmiCard>(this.reqEmiCards,emiCard,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }


  //Method  to create a new player.
  // createUser(player:Player):Observable<Player>
  // {
  //   return this.http.post<Player>(this.req,player,{
  //     headers:new HttpHeaders({
  //       'Content-Type':'application/json;charset=UTF-8',
  //       'Access-Control-Allow-Origin':'*',
  //       'Access-Control-Allow-Method':'*'
        
  //     })
  //   });
  // }

  // verifyConsumer(id:number, consumer:Consumer):Observable<any>{
  //   // console.log(id+ " "+this.consumer.isVerfied);
  //   this.consumer = consumer;
  //   console.log(this.consumer);
  //   console.log(this.req+"/"+id);
  //   // debugger;
  //   // return this.http.put<any>(this.req+"/"+id,consumer);
  //   return this.http.put<any>(this.req+"/"+id,consumer,{
  //     headers:new HttpHeaders({
  //       'Content-Type':'application/json;charset=UTF-8',
  //       'Access-Control-Allow-Origin':'*',
  //       'Access-Control-Allow-Method':'*'
  //     })
  //   }).pipe(catchError(this.manageErrors));
  // }

  // private manageErrors(error:HttpErrorResponse){
  //   // let msg='';
  //   if(error.error instanceof ErrorEvent){
  //     console.error("Client Side error",error.error.message);
  //   }
  //   else{
  //     console.error("Server Side Error", error);
  //   }
  //   return throwError('There is a little problem while processing your request.Sorry for the inconvenience');
  // }

  
}
