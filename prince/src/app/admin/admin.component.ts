import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; //<img> tag in HTML for preview purposes
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';




@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  title: any;
  author: any;
  description: any;
  whereToBuy: any;
  imagePath: any;
  releaseDate: any;
  /* genre: any; */
  type: any;
  volume: any;
  season: any;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

  sanitizeImage(base64String: string) {
    this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${base64String}`); // we use sanitizer so we can preview the image
  }


  onFileSelected(event: Event) {
    // Cast the event target to an HTMLInputElement to access the files property.
    const input = event.target as HTMLInputElement;
    // If no files selected or they dont exist, exit the function. 
    if (!input.files?.length) return;
    // Access the first file in the FileList object.
    const file = input.files[0];
      // Create a new FileReader object to read the content of the file.
    const reader = new FileReader();
     // Set the onload event handler for the FileReader.
  // This function is called once the read operation is successfully completed.
    reader.onload = (e) => {
      // Define an event handler for when the reader loads a file
      const base64String = btoa(reader.result as string);
      this.sanitizeImage(base64String);
      // Set the image path to a data URL with the base64 string
      this.imagePath = `data:image/png;base64,${base64String}`;
    };
    reader.readAsBinaryString(file);
  }


  createBook() {
    const bookData = {
      product_title: this.title,
      product_desc: this.description,
      product_type: this.type,
      product_author: this.author,
      /* genre_id: this.genre, */
      product_release: this.releaseDate,
      product_cover: this.imagePath,
      available_at: this.whereToBuy,
      volume: this.volume,
      season : this.season,
    };

    // Send a POST request to the server with the book data
    this.http.post('http://127.0.0.1:8000/api/products', bookData).subscribe(
      res => {
        console.log(res);
        this.title = '';
        this.author = '';
        this.description = '';
        this.whereToBuy = '';
        this.imagePath = '';
        this.releaseDate = '';
        this.type = '';
        this.volume = '';
        this.season = '';
      },
      err => {
        console.error(err);
      }
    );
  }

  // close this

  // function to clear the input fields
  // test test
  clearInput() {
    const isConfirmed = window.confirm('Are you sure you want to clear the input fields?');
    if (isConfirmed) {
      this.title = '';
      this.description = '';
      this.type = '';
      this.author = '';
      this.releaseDate = '';
      this.imagePath = '';
      this.whereToBuy = '';
      this.volume = '';
      this.season = '';
    }
  }
}
