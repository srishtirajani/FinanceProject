import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // flag_verify:any;
  
  constructor(private router: Router) {

    // this.flag_verify="not verified";

  }

  canActivate() {
    let result = localStorage.getItem('userName');

    let flag_verify=localStorage.getItem('flag_verify');

    // if(localStorage.getItem('flag_verify')=='verified'){
      
    // }

    console.log(result)

    //: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    // route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot
    // 
    if(result=="admin" || flag_verify=="verified"){
    
    //this.router.navigate(['admin']);
      console.log(result)
      return true;
      
    }
      

    //this.router.navigate(['dashboard']);
    //this.router.navigate(['dashboard']);
    this.router.navigate([''])
    return false;
  
  }

}
  

