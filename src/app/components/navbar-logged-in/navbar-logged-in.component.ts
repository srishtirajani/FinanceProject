import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-logged-in',
  templateUrl: './navbar-logged-in.component.html',
  styleUrls: ['./navbar-logged-in.component.css']
})
export class NavbarLoggedInComponent implements OnInit {

  userName:any;
  constructor() { }

  ngOnInit(): void {
    this.userName=localStorage.getItem('userName');
  }

}
