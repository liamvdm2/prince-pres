import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  editMode = false;
  getUser: any = {};

  constructor(private router: Router, private userService: UserService) { }

  async toggleEditMode() {
    if (this.editMode) {
      try {
        const result = await fetch('/api/users/' + this.getUser.id, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.getUser.name,
            surname: this.getUser.surname,
            email: this.getUser.email,
            birthday: this.getUser.birthday,
            username: this.getUser.username,
            password: this.getUser.password,
          }),
        });
        const updatedUser = await result.json();
        this.getUser = updatedUser;
        console.log('User updated successfully');
        this.editMode = !this.editMode;
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      this.editMode = !this.editMode;
    }
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  ngOnInit() {
    let userDetails = localStorage.getItem('username');
    if (userDetails) {
      this.getUser = JSON.parse(userDetails);
      console.log(this.getUser);
    }
  }


  // logout method
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    console.log('Logged out successfully');
    this.getUser.name = ' ';
    this.router.navigate(['/login']);
  }
}