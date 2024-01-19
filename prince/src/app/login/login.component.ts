import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: any;
  password: any;





  constructor(private http: HttpClient, private router: Router) { }




  onSubmit() {

    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://127.0.0.1:8000/api/login', credentials).subscribe(
      res => {
        console.log(res);
        // Navigate to profile page
        this.router.navigate(['/userprofile']);
      },
      err => {
        console.error("oops there was an error!");
        // Handle failed login here
      }
    );

    this.username = '';
    this.password = '';
}
}
