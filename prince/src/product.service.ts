import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

    constructor() { }
    productsUrl: string = 'http://127.0.0.1:8000/api/products';

    getProducts() {
       return fetch(this.productsUrl).then(res => res.json());
      
    }
}