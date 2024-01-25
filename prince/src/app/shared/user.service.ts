import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	async register(username: any, password: any, surname: any, name: any, email: any) {
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		const user = {
			username: username,
			password: hashedPassword,
			surname: surname,
			name: name,
			email: email
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
			if (!response.ok) {
				throw new Error('Failed to fetch users');
			}
			const data = await response.json();
			return Array.isArray(data) ? data : [];
		} catch (error) {
			console.error('Error fetching users:', error);
			throw error; // Propagate the error
		}
	}
	// Checks user credentials and returns a valid token or null
	async login(username: string, password: string): Promise<string | null> {
		const body = { username, password };

		let users = await this.getUsers();

		let user = users.find((u: { username: string; password: string; }) => u.username === username);

		if (user && bcrypt.compareSync(password, user.password)) {
			return user.id.toString();
		}
		return null
	}
}