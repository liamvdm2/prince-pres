import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {


	private currentUserSubject = new BehaviorSubject<any>(null);
	private userRole: any; 

	get currentUser() {
		return this.currentUserSubject.asObservable();
	}


	
	async register(username: any, password: any, surname: any, name: any, email: any, birthday: any, role_id: number = 2) {


		const user = {
			username: username,
			password: password,
			surname: surname,
			name: name,
			email: email,
			birthdate: birthday,
			role_id: role_id
		};
		const result = await fetch('http://127.0.0.1:8000/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		return result.json();
	}


	// Returns all users

	async getUsers() {
		try {
			const response = await fetch('http://127.0.0.1:8000/api/users');
			// nice error handling
			if (!response.ok) {
				throw new Error('Failed to fetch users');
			}
			// convert response to JSON
			const data = await response.json();
			// the object is an array of objects and the .data is the array of users
			return data;

		} catch (error) {
			console.error('Error fetching users:', error);
			throw error; // Propagate the error
		}
	}
	// Authenticates a user credentials and returns a valid token or null
	async login(username: string, password: string): Promise<string | null> {
		const body = { username, password };
		let users = await this.getUsers();
		let user = users.find((u: { username: string; password: string; }) => u.username === username);
		if (bcrypt.compareSync(password, user.password)) {

			this.currentUserSubject.next(user);

			this.userRole = user.role_id; // Set the userRole property
			localStorage.setItem('userRole', user.role_id.toString()); // Store userRole in local storage

			return user;
		}
		return null;
	}

	async updateUser(id: number, user: any, name: string, surname: any, email: any, birthday: any, username: any, password: any) {
		// Construct the user object
		const updatedUser = {
			id: id,
			name: name,
			surname: surname,
			email: email,
			birthday: birthday,
			password: user.password,
			username: user.username
		};

		const result = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedUser),
		});

		if (!result.ok) {
			console.error('HTTP response status:', result.status);
			console.error('HTTP response body:', await result.text());
			throw new Error('Failed to update user');
		}

		const data = await result.json();
		/* console.log('Updated user data:', data); */

		return data;
	}
}

