import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductInfoService } from 'src/app/services/product-info.service';
import { DataProd } from 'src/app/services/product.service';
import { Data } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  pid:number=this.data.pid;
  product:any;
  emi:number=0;
  selectedEmi:any;

  emiPeriod: any=[
    {name: '3 Months', value: 3}, 
    {name: '6 Months', value: 6}, 
    {name: '9 Months', value: 9}, 
    {name: '1 Year', value: 12}
  ];

  constructor(private productService:ProductInfoService, private router:Router,private data: DataProd,private pay:Data) { }

  
  ngOnInit(): void { this.productService.GetProdById(this.pid).subscribe(data=>{
    this.product=data;
    console.log(this.product);
  });
  console.log(this.product);
  console.log(new Date().getMonth()); 
  this.selectedEmi = new Object();

}
Payment(){
  this.pay.storage=this.product;
  this.router.navigate(['payment']);

}
}
  