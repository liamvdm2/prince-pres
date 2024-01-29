import { Component, OnInit } from '@angular/core';
import { MangaService } from './manga-service.service';
import { Router } from '@angular/router';

@Component({
 selector: 'app-manga',
 templateUrl: './manga.component.html',
 styleUrls: ['./manga.component.css'],
 standalone: true // Add this line
})
export class MangaComponent implements OnInit {
 constructor(private mangaService: MangaService, private router: Router) { }

 mangaProducts: any[] = [];

 ngOnInit(): void {
    this.mangaService.getMangaProducts()
      .subscribe(data => {
        this.mangaProducts = data;
        console.log('Manga products:', this.mangaProducts);
      }, error => console.error('Error fetching manga products:', error));
 }

 goToDetailsPage(id: string): void {
    const productId = +id;
    console.log(`Navigating to details page with ID: ${productId}`);
    this.router.navigate([productId, 'details']);
 }
}
