import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  surname:string ='';
  name:string='';
  email:string='';
  password:string='';
  username:string='';
  showPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.router.navigate(['/login']);
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.6.0'},
      body: JSON.stringify({
         "surname": this.surname,
         "email": this.email,
         "password": this.password,
         "name": this.name,
         "usernhame": this.username
      })
     };
    
    fetch('http://127.0.0.1:8000/api/users', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
      
    console.log('You have been registered:', {
      surname: this.surname,
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username
    });

    // acces the service and send username and password
    this.userService.register(this.username, this.password, this.surname, this.name, this.email);
    alert('Registration successful!'); // Show a notification
    console.log('You have been registered'); // Log to console
  
      // clear the fields;
      this.username = '';
      this.password = '';
      this.surname = '';
      this.name = '';
      this.email = '';
      
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

// TODO : when database is connected put this in the database instead of the console log
