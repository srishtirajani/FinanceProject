import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {

    let result = localStorage.getItem('userName');
    let flag_verify=localStorage.getItem('flag_verify');

    if(result=="admin" || flag_verify=="verified"){
      console.log(result)
      return true;
    }
    this.router.navigate([''])
    return false;
  }

}
  

