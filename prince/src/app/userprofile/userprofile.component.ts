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
  getUser: any = {}; // Initialize getUser to an empty object

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null; // Return true if a token is found
  }

 ngOnInit () {
   // get the userdetails from localstorage and parse to object
   let userDetails = localStorage.getItem('username');
   if (userDetails) {
       this.getUser = JSON.parse(userDetails);
       console.log(this.getUser);
   }

}

}

/*SUBMIT BUTTON */