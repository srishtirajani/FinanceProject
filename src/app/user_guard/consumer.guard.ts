import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ConsumerGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(){

    let result = localStorage.getItem('userName_guard');
    // let flag_verify=localStorage.getItem('flag_verify');

    console.log(result)

  
    if(result=="true"){
      console.log(result)
      return true;
    }
    
    this.router.navigate([''])
    return false;

  }
  
}
