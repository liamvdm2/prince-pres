import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
	providedIn: 'root'
})
export class BuzzService {


	async buzz(title: any, description: any, author: any) {


		const Buzz = {
			news_title: title,
			news_description: description,
			news_author: author
		};
		const result = await fetch('http://127.0.0.1:8000/api/buzz', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(Buzz)
		});
		return result.json();
	}

	constructor(private http: HttpClient) { }

	private apiUrl = 'http://127.0.0.1:8000/api/buzz';

	getById(id: string): Promise<any> {
		// Send a GET request to the API
		return this.http.get(`${this.apiUrl}/${id}`).toPromise().then(response => {
		   console.log(response); // Log the response
		   const Buzz = response as any[];
		   for (let buzz of Buzz) {
			 if (buzz.id === Number(id)) {
			   return buzz;
			 }
		   }
		   throw new Error(`This post is not found or deleted`);
		});
	   }
}