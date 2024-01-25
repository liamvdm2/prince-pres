import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: any;
  password: any;
  rememberMe: boolean = false;


  constructor(private router: Router, private userService: UserService) { }



  async onSubmit() {

    //console.log('Username:', this.username);
    
    const token = await this.userService.login(this.username, this.password);
    if (token) {
      console.log('Server Response:', token);
      //Store token in local storage
      localStorage.setItem('username', this.username.toString());
      localStorage.setItem('token', token);
      //Redirect to protected component
      this.router.navigate(['/userprofile']);
      console.log('Login successful for user:', this.username);

    } else {
      alert('Invalid username or password.');
      
    }

    //console.log('Login successful for user:', this.username);
  }
  
// logout method
	logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    console.log('Logged out successfully');
    }
}
