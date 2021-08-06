import { Component, OnInit } from '@angular/core';
import { Consumer } from 'src/app/models/consumer';
import { Data } from 'src/app/services/admin.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  consumer:any=this.data.storage;

  constructor(private data: Data) { }

  ngOnInit(): void {
    console.log(this.consumer);
  }

  verifyConsumer(){
    
  }

}
