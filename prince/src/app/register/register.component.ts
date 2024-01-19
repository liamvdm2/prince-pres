import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: any;
  surname: any;
  username: any;
  password: any;
  email: any;
  confirmPassword: any;

  terms: boolean = false; /* made it false by default because the laws say that you need to accept them yourself and not prechecked  */



  showPassword = false; /* made it false by default so it is not shown by default */

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; /* went from true to false */
  }



  toggleTerms() {
    this.terms = !this.terms; /* went from true to false and vice versa when the checkbox is clicked */
    console.log(this.terms);
  }

  constructor(private http: HttpClient) { }


  onSubmit() {



    const termsaccepted = document.getElementById("terms") as HTMLInputElement; /* get the checkbox */
    if (!termsaccepted.checked) {                                           /* if the checkbox is not checked show an alert */
      alert("Please accept the terms and conditions");
      return;
    }


    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;        /* email must match this pattern */
    if (!emailPattern.test(this.email)) {                                   /* if the email does not match the pattern show an alert */
      alert("Please enter a valid email address");
      return;
    }





    /* Here we check if the password matches the pattern */
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;        /* password must be at least 8 characters, a number, and an uppercase letter */
    if (!passwordPattern.test(this.password)) {                             /* if the password does not match the pattern show an alert */
      alert("Password must contain at least 8 characters, a number, an uppercase letter and a lowercase letter");
      return;
    }
    /* Here we check if the passwords match  */
    if (this.password !== this.confirmPassword) {                           /* if the passwords do not match show an alert */
      document.getElementById("error")!.innerText = ("Passwords do not match");
      return;
    }

    /* TODO : check if email is already in the database and if the username is already in the database */


    else {

      const userDetails = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        password: this.password,
        email: this.email
      };

      this.http.post('http://127.0.0.1:8000/api/users', userDetails).subscribe(
        res => {
          console.log(res);
          // Reset the form fields
          this.name = '';
          this.surname = '';
          this.username = '';
          this.password = '';
          this.email = '';
          this.confirmPassword = '';
          this.terms = false;
        },
        err => {
          console.error(err);
        }
      );
    }

  }
}

// TODO : when database is connected put this in the database instead of the console log
