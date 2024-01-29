import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
 providedIn: 'root'
})
export class MangaService {
 private apiUrl = 'http://127.0.0.1:8000/api/products';

 constructor(private http: HttpClient) { }

 getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
 }

 getMangaProducts(): Observable<any[]> {
    return this.getAllProducts().pipe(
      map((products: any[]) => products.filter(product => product.product_type === 'M'))
    );
 }
}
