import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
constructor(private router: Router) {

}

  canActivate(
   ) {
      let result = localStorage.getItem('userName');
      console.log(result)

//: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
     // route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot
      if(result=="admin"){
      
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
  

