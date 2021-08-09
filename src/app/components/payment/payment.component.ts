import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/services/admin.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
product:any;
  constructor(private pay:Data) { }

  ngOnInit(): void {
    this.product=this.pay.storage;
    console.log(this.product)
  }

}
