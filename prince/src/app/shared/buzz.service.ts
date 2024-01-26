import { Injectable } from '@angular/core';


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
}