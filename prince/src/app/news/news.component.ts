import { Component, OnInit } from '@angular/core';
import { BuzzService } from '../shared/buzz.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [BuzzService],
})

export class NewsComponent implements OnInit {
  buzz: any;

  constructor(private buzzService: BuzzService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id !== null) {
        this.buzzService.getById(id).then((buzzItem: any) => {
          this.buzz = buzzItem;
          console.log(this.buzz); // Log the buzz item to the console
        });
      }
    });
  }
}
