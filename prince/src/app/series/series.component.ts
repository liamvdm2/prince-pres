import { Component, OnInit } from '@angular/core';
import { SeriesService } from './series.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit {
  series: any[] = [];

  constructor(private seriesService: SeriesService, private router: Router) { }

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe((data: any[]) => {
      // Group the series by product_title
      const groupedSeries = data.reduce((acc, curr) => {
        if (!acc[curr.product_title]) {
          acc[curr.product_title] = [];
        }
        acc[curr.product_title].push(curr);
        return acc;
      }, {} as Record<string, any[]>);

      // Convert the groupedSeries object back to an array
      this.series = Object.entries(groupedSeries).map(([productTitle, series]) => ({ productTitle, series }));
      console.log(this.series);
    });
  }

  goToDetailsPage(id: string): void {
    const productId = +id;
    console.log(`Navigating to details page with ID: ${productId}`);
    this.router.navigate([productId, 'details']);
  }

}