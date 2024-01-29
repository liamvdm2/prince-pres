import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule],
  providers: [ProductService, CommonModule],
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) { }

  products: any;
  productsUrl = this.productService.productsUrl
  currentSeason: string = '';
  seasonalProducts: any[] = [];
  bgImage: string = '';

  getProducts() {
    this.productService.getProducts()
      .then(data => {
        this.products = data;
        this.currentSeason = this.getCurrentSeason();
        this.seasonalProducts = this.filterBySeason(this.currentSeason);
        console.log('All products:', this.products);
        console.log('Filtered products:', this.seasonalProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }
  getCurrentSeason(): string {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    let season = '';
    if (month === 3 && day >= 21 || month === 4 || month === 5) {
      season = 'spring';
    } else if (month === 6 && day >= 21 || month === 7 || month === 8) {
      season = 'summer';
    } else if (month === 9 && day >= 21 || month === 10 || month === 11) {
      season = 'autumn';
    } else {
      season = 'winter';
    }
    return season;
  }

  ngOnInit() {
    this.getProducts();
    this.bgImage = this.getBgImagePath(this.currentSeason);
  }

  getBgImagePath(season: string): string {
    switch (season) {
      case 'spring':
        return '../../assets/spring.png';
      case 'summer':
        return '../../assets/summer.png';
      case 'autumn':
        return '../../assets/autumn.png';
      default:
        return '../../assets/winter.png';
    }
  }

  filterBySeason(season: string): any[] {
    return this.products.filter((product: any) => product.season === season);
  }

  goToDetailsPage(id: string): void {
    const productId = +id;
    console.log(`Navigating to details page with ID: ${productId}`);
    this.router.navigate([productId, 'details']);
  }
}