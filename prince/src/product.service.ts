import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
    private apiUrl = 'http://127.0.0.1:8000/api/products';

    constructor(private http: HttpClient) { }

    getProducts() {
        return this.http.get(this.apiUrl);
    }
}