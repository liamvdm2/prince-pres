import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../userprofile/user.service';

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


  rememberMe: boolean = false;


  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  login() {
    // Assuming you get the user information after a successful login
    const loggedInUser = { username: this.username }; 

    // Set the logged-in user
    this.userService.setLoggedInUser(loggedInUser);
  }

  onSubmit() {

    const credentials = {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    };

    console.log('Sending credentials:', credentials.username);

    this.http.post('http://127.0.0.1:8000/api/login', credentials).subscribe(
      (res:any) => {
        console.log('Server response', res);
        
        const loggedInUser = res.user;
        this.userService.setLoggedInUser(loggedInUser);


        // Navigate to profile page
        this.router.navigate(['/userprofile']);
      },
      err => {
        console.error('Error during login', err);
        // Handle failed login here
      }
    );

    this.username = '';
    this.password = '';
}
}
