import { Component } from '@angular/core';
import { BuzzService } from '../shared/buzz.service';

import { HttpClient } from '@angular/common/http';


@Component({
 selector: 'app-news',
 templateUrl: './news.component.html',
 styleUrls: ['./news.component.css']
})
export class NewsComponent {
 buzz: any;

 constructor(private http: HttpClient, private buzzService: BuzzService) { }

 getProducts() {
    this.buzzService.getBuzz().then(data => {
      this.buzz = data;
      console.log('All products:', this.buzz);
    }).catch(error => console.log(error));
 }
}