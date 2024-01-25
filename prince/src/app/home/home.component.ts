import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule],
  providers: [ProductService, CommonModule], // add your service here
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) { }

  products: any;
  productsUrl = this.productService.productsUrl

  getProducts() {
    this.productService.getProducts().then(data => {
      this.products = data;
      console.log(data);
    }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.getProducts();
  }
}