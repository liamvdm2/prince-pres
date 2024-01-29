import { Component, OnInit } from '@angular/core';
import { LightNovelService } from './light-novel-service.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-light-novel',
 templateUrl: './lightnovel.component.html',
 styleUrls: ['./lightnovel.component.css'],
 standalone: true
})
export class LightNovelComponent implements OnInit {
 constructor(private lightNovelService: LightNovelService, private router: Router) { }

 lightNovelProducts: any[] = [];

 ngOnInit(): void {
    this.lightNovelService.getLightNovelProducts()
      .subscribe(data => {
        this.lightNovelProducts = data;
        console.log('Light novel products:', this.lightNovelProducts);
      }, error => console.error('Error fetching light novel products:', error));
 }

 goToDetailsPage(id: string): void {
    const productId = +id;
    console.log(`Navigating to details page with ID: ${productId}`);
    this.router.navigate([productId, 'details']);
 }
}
