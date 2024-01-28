import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  
  private apiUrl = 'http://127.0.0.1:8000/api';
  private userObject = {
    user_id: undefined
  };



  constructor(private http: HttpClient, private userService: UserService) { 
    userService.currentUser.subscribe(user => {
      this.userObject = user;
      
    });
    console.log('test', this.userObject);
 }
 

addToWishlist(productId: number) {
  const url = `${this.apiUrl}/wishlist/${this.userObject.user_id}/${productId}`;
  return this.http.post(url, {});
}

getWishlist() {
  const url = `${this.apiUrl}/wishlist/${this.userObject.user_id}`;
  return this.http.get(url);
 }
/*public async addToWishlist(userId: string, productId: string): Promise<any> {
  try {
      const response = await this.http.post('http://127.0.0.1:8000/api/wishlist/%7Busername%7D', { userId, productId }).toPromise();
      return response;
  } catch (error) {
      console.error(error);
  }
}*/
}
