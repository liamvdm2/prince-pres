import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  editMode = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null; // Return true if a token is found
  }

  getUsername() {
    // Implement logic to get the username of the logged-in user
    try {
      const username = localStorage.getItem('username');
      if (username) {
        return username;
      } else {
        // Handle case where username is not set
        return 'Unknown User'; // Placeholder, update as needed
      }
    } catch (e) {
      console.error('Error accessing local storage:', e);
      return 'Unknown User'; // Placeholder, handle this as per your application's logic
    }
  }
}

/*SUBMIT BUTTON */