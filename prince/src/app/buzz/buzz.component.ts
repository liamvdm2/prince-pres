import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-buzz',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule, RouterModule],
  templateUrl: './buzz.component.html',
  styleUrl: './buzz.component.css'
})
export class BuzzComponent {

  title: any;
  author: any;
  description: any;

  constructor(private http: HttpClient) { }

  createBuzz() {
    const buzzData = {
      product_title: this.title,
      product_desc: this.description,
      product_author: this.author,
    };

    // Send a POST request to the server with the book data
    this.http.post('http://127.0.0.1:8000/api/buzz', buzzData).subscribe(
      res => {
        console.log(res);
        this.title = '';
        this.author = '';
        this.description = '';
      },
      err => {
        console.error(err);
      }
    )
  };


  clearInput() {
    const isConfirmed = window.confirm('Are you sure you want to clear the input fields?');
    if (isConfirmed) {
      this.title = '';
      this.description = '';
      this.author = '';
    }
  }

}

