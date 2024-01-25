import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(private userService: UserService) { }

  toggleEditMode() {
    if (this.editMode) {
      // TODO: Edit and save function
      alert('TEST TEST TEST')
      this.editMode = !this.editMode;
    } else {
      // If in edit mode, toggle the editMode property
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

  async updateUser() {
    try {
      // Assuming 'id' is a property in the getUser object
      const result = await this.userService.updateUser(
        this.getUser.id, 
        this.getUser,
        this.getUser.name,
        this.getUser.surname,
        this.getUser.email,
        this.getUser.birthday
      );
      console.log(result); // Log the result from the server
      // You may want to handle success or show a message to the user
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error, show an error message, etc.
    }
  }
}