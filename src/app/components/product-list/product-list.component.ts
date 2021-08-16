import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import {  DataProd, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  constructor(private productService:ProductService, private router:Router,private data: DataProd) { }
  product:Product[]=[];

  ngOnInit(): void {this.productService.GetAllProducts().subscribe(data=>{
    this.product=data;
  });
 }

 getProdInfo(pid:number){
   this.data.pid=pid;
  this.router.navigate(['productinfo']);
 }

}
