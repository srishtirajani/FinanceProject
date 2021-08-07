import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consumer } from 'src/app/models/consumer';
import { AdminService, Data } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  consumers:Consumer[]=[];

  constructor(private aService:AdminService, private router: Router, private data: Data) { }

  ngOnInit(): void {
    this.aService.showAllConsumers().subscribe(data=>{
      this.consumers=data;
    });
  }
  
  toVerify(){
    this.data.storage=this.consumers;
    this.router.navigate(['verify']);
  }
}
