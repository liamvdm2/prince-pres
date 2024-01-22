import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; //<img> tag in HTML for preview purposes
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule],
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
  genre: any;
  type: any;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

  sanitizeImage(base64String: string) {
    this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${base64String}`);
  }



  onFileSelected(event: Event) {
    // Cast the event target to an HTMLInputElement to access the files property.
    const input = event.target as HTMLInputElement;

    // If there are no files selected (or the files property does not exist), exit the function.
    if (!input.files?.length) return;

    // Access the first file in the FileList object.
    const file = input.files[0];

    // Create a new FileReader object to read the content of the file.
    const reader = new FileReader();

    // Set the onload event handler for the FileReader.
    // This function is called once the read operation is successfully completed.
    reader.onload = (e) => {
      // Convert the file content to a base64 encoded string.
      const base64String = btoa(reader.result as string);

      // Call the uploadImage function and pass the base64 encoded string.
      this.uploadImage(base64String);
    };

    // Start reading the file's content as a binary string.
    reader.readAsBinaryString(file);
  }

  uploadImage(base64String: string) {
    // Implementation to send the base64 string to your API.
  }

  createBook() {
    let bookData = {
      product_title: this.title,
      product_desc: this.description,
      product_type: this.type,
      product_author: this.author,
      availableAt: this.whereToBuy,
      product_cover : this.imagePath,
      product_release: this.releaseDate,
      product_genre: this.genre
      
    };
   
    // Send a POST request to the server with the book data
    this.http.post('http://127.0.0.1:8000/api/products', bookData).subscribe(response => {
       console.log(response);
    });
  }
}
