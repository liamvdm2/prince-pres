import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

 getProducts(): Promise<any[]> {
    return this.http.get(`${this.apiUrl}`).toPromise().then(response => {
      return response as any[];
    });
 }

 filterByTitle(title: string): Promise<any[]> {
    return this.getProducts().then(products => {
       return products.filter((product: any) => product.product_title === title);
    });
   }

   getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
 }
}