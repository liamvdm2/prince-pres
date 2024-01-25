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
  birthday: Date = new Date();
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
         "username": this.username,
         "birthday": this.birthday,
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
      username: this.username,
      birthday: this.birthday
    });

    // acces the service and send username and password
    this.userService.register(this.username, this.password, this.surname, this.name, this.email, this.birthday);
    alert('Registration successful!'); // Show a notification
    console.log('You have been registered'); // Log to console
  
      // clear the fields;
      this.username = '';
      this.password = '';
      this.surname = '';
      this.name = '';
      this.email = '';
      this.birthday = new Date();
      
      
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

