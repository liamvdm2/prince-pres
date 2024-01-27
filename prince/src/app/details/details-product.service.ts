import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsProductService {
  private apiUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) { }

  getProductById(id: string): Promise<any> {
    // Send a GET request to the API
    return this.http.get(`${this.apiUrl}`).toPromise().then(response => {
      const products = response as any[];
      for (let product of products) {
        if (product.id === Number(id)) {
          return product;
        }
      }
      throw new Error(`No product found with ID ${id}`);
    });
  }
}