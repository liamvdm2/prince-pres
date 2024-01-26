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
      // TODO: Edit and save function
      try {
        const result = await this.userService.updateUser(
          this.getUser.id, 
          this.getUser,
          this.getUser.name,
          this.getUser.surname,
          this.getUser.email,
          this.getUser.birthday,
          this.getUser.username
        );
        console.log(result);
      } catch (error) {
        console.error('Error updating user:', error);
      }
      this.editMode = !this.editMode;
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

/*   async updateUser() {
    try {
      const result = await this.userService.updateUser(
        this.getUser.id, 
        this.getUser,
        this.getUser.name,
        this.getUser.surname,
        this.getUser.email,
        this.getUser.birthday,
        this.getUser.username
      );
      console.log(result);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  } */

  // logout method
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    console.log('Logged out successfully');
    this.getUser.name = ' ';
    this.router.navigate(['/login']);
  }
}