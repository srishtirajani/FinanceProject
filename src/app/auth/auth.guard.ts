import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if(localStorage.getItem('userName')=="admin"){
      this.router.navigate(['admin']);
       return true;
      }
      else
       this.router.navigate(['dashboard']);
  this.router.navigate(['dashboard']);
  return false;
  }

  }
  

