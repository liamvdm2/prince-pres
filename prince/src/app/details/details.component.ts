import { Component, OnInit } from '@angular/core';
import { ProductServiceDetails } from './productDetails.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  products: any;
  productsUrl = this.productServiceDetails.productsUrl;

  constructor(private productServiceDetails: ProductServiceDetails) { }

  getProducts() {
    this.productServiceDetails.getProducts().then(data => {
      this.products = data;
      console.log(data);
    }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.getProducts();
  }
}