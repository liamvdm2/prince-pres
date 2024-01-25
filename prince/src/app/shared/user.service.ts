import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	async register(username: any, password: any, surname: any, name: any, email: any, birthday: any, role: string) {
	
	/* 	
		Disabled the password hashing because the laravel api will do this automaticly in the User::create method.
		The example provided by me was with the json server... there we had no auto password hashing!

		Sooooo... in the end, it does matter ;)

		We where double encrypting the password (once in angular, and again in laravel)
		Our password would never been true this way...
		Laravel also uses the same hasing bcrypt hashing algoritm -> so perfecly compatable with our login check routine in angular.

		// Not needed with the laravel api
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
	 */

		const user = {
			username: username,
			password: password,
			surname: surname,
			name: name,
			email: email,
			birthdate: birthday,
			role: role,
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
	// Checks user credentials and returns a valid token or null
	async login(username: string, password: string, role: string): Promise<string | null> {
		const body = { username, password };
		console.log(body);
		let users = await this.getUsers();
		console.log(users);
		let user = users.find((u: { username: string; password: string;  role: string;}) => u.username === username && u.role === 'admin');
		console.log (user);
		console.log (password, user.password);	
		console.log (bcrypt.compareSync(password, user.password));
		if (bcrypt.compareSync(password, user.password)) {
		   return user;
		}
		return null
	   }
	   
}