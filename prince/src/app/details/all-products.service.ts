import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class AllProductsService {
 private apiUrl = 'http://127.0.0.1:8000/api/products';

 constructor(private http: HttpClient) { }

 getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
 }
}