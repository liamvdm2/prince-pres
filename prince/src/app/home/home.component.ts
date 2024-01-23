import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;
  productsUrl = this.productService.productsUrl;

  constructor(private productService: ProductService) { }

  getProducts() {
    this.productService.getProducts().then(data => {
      console.log(data);
    }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.getProducts();
  }
}

@NgModule({
  imports: [CommonModule],
  providers: [ProductService]
})
export class AppModule { }