import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  constructor() { }

  //Guards 
  ngOnInit(): void {
    localStorage.setItem('flag_verify', 'not verified'); //For verify to Admin routing
    localStorage.setItem('userName', ''); //For login to Admin routing
    localStorage.setItem('userName_guard', ''); //For login to dashboard routing
  }

  terms(){
    open("/terms-index");
  }
}
