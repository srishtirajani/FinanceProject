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
  constructor(private pay:Data, private dataC: DataC) { }
  processingfee: number = 0
  totalcost : number = 0
  EMIvalue: number = 0
  ngOnInit(): void {
    this.purchaseRecord=this.dataC.storage;
    this.product=this.pay.storage;
    console.log('hi')
    console.log(this.purchaseRecord)
    console.log(this.product)
    console.log(this.product.productName)
    this.processingfee = this.product.price * 0.05;
    this.EMIvalue = this.product.price/this.purchaseRecord.totalMonthsSelected
    this.totalcost = this.product.price  + this.processingfee

  }

}
