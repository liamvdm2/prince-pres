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

  getProducts() {
    this.productService.getProducts().then(data => {
      this.products = data;
      this.currentSeason = this.getCurrentSeason();
      this.seasonalProducts = this.filterBySeason(this.currentSeason);
      console.log('All products:', this.products);
      console.log('Filtered products:', this.seasonalProducts);
    }).catch(error => console.log(error));
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

  filterBySeason(season: string): any[] {
    return this.products.filter((product: any) => product.season === season);
  }

  goToDetailsPage(id: string): void {
    console.log(`Navigating to details page with ID: ${id}`);
    this.router.navigate(['/details', id]);
   }

  ngOnInit() {
    this.getProducts();
  }
}