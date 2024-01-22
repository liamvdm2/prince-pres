import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  editMode = false;
  loggedInUser: any;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  constructor(private userService: UserService) {
    // Retrieve the logged-in user information when the component is initialized
    this.loggedInUser = this.userService.getLoggedInUser();
  }

  ngOnInit() {
    this.loggedInUser = this.userService.getLoggedInUser();
    console.log('Logged-in User:', this.loggedInUser?.username);
    
  }
}

/*SUBMIT BUTTON */

