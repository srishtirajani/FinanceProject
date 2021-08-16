import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/services/admin.service';
import { DataC } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  product:any;
  purchaseRecord: any;
  processingfee: number = 0
  totalcost : number = 0
  EMIvalue: number = 0

  constructor(private pay:Data, private dataC: DataC) { }

  ngOnInit(): void {
    this.purchaseRecord=this.dataC.storage;
    this.product=this.pay.storage;
    this.processingfee = this.product.price * 0.05;
    this.EMIvalue = this.product.price/(this.purchaseRecord.totalMonthsSelected+1)
    this.totalcost = this.product.price  + this.processingfee
  }

}
