import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsProductService } from './details-product.service';

@Component({
 selector: 'app-details',
 templateUrl: './details.component.html',
 styleUrls: ['./details.component.css'],
 providers: [DetailsProductService]
})
export class DetailsComponent implements OnInit {
 product: any;

 constructor(private DetailsProductService: DetailsProductService, private route: ActivatedRoute) { }

 ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id !== null) {
        this.DetailsProductService.getProductById(id).then((product: any) => {
          this.product = product;
          console.log(this.product); // Log the product to the console
        }).catch((err: any) => {
          // Handle error
        });
      }
    });
 }
}