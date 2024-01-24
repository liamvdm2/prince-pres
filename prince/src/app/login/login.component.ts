import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: any;
  password!: string;


  rememberMe: boolean = false;


  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }



  async onSubmit() {

    const credentials = {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    };

    const  token  =  await this.userService.loggedInUser(this.username, this.password);
		if (token) {
			// Store token in local storage
			localStorage.setItem('token', token);
      console.log('You now have access to the protected component', 'Yay');
			this.router.navigate(['/userprofile']);
			// ...
			} else {
        console.log('Wrong credentials', 'Not Yay');
			
			}

    console.log('Sending credentials:', credentials.username);

    this.http.post('http://127.0.0.1:8000/api/login', credentials).subscribe(
      (res:any) => {
        console.log('Server response', res);
        
        const loggedInUser = res.user;


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
