import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private loggedInUser: any;

  async getUsers() {
		return (await fetch('http://127.0.0.1:8000/api/users')).json()
	}

  async loggedInUser(username: string) {
    let users = await this.getUsers();
    let user = users.find((u: { username: string; }) => u.username === username);
    /*const user = {
      name: username
    }*/
  }

  // Implement a method to set the logged-in user
  setLoggedInUser(user: any) {
    /*this.loggedInUser = user;
    console.log('User set in UserService:', this.loggedInUser);*/

    if (user && user.username) {
      this.loggedInUser = user.username;
      console.log('Username set in UserService:', this.loggedInUser);
    } else {
      console.error('Invalid user object or username missing.');
    }
  }

  // Implement a method to get the logged-in user
  getLoggedInUser() {
    return this.loggedInUser;
  }
}
