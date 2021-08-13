import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
    // debugger;
    localStorage.setItem('flag_verify', 'not verified');
    localStorage.setItem('userName', 'not enterred');
    console.log("I am inside ng onInit of Index");
  }

}
