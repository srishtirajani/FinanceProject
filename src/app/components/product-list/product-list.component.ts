import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Data, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  constructor(private productService:ProductService, private router:Router,private data: Data) { }
  product:Product[]=[];

  ngOnInit(): void {this.productService.GetAllProducts().subscribe(data=>{
    this.product=data;
    console.log(this.product);
  });
 }

 getProdInfo(pid:number){
   this.data.pid=pid;
   console.log(this.data.pid);
  this.router.navigate(['productinfo']);
 }

}
