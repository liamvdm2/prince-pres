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
}

/*SUBMIT BUTTON */

