import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private loggedInUser: any;

  async getUsers() {
		return (await fetch('http://127.0.0.1:8000/api/users')).json()
	}

  // Checks user credentials and returns a valid token or null
	async loggedInUser(username: string, password: string) {
		let users = await this.getUsers();
		let user = users.find((u: { name: string; password: string; }) => u.name === username);
		if (user && bcrypt.compareSync(password, user.password)) {
		  return user.id.toString();
		}
		return null;
	  }
}