import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  editMode = false;
  loggedInUser: any;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  constructor(private userService: UserService) {
    // Retrieve the logged-in user information when the component is initialized
    this.loggedInUser = this.userService.getLoggedInUser();
  }
}

/*SUBMIT BUTTON */

