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
  }


  addToWishlist(productId: number) {
    const url = `${this.apiUrl}/wishlist/${this.userObject.user_id}/${productId}`;
    return this.http.post(url, {});
  }

  getWishlist() {
    const url = `${this.apiUrl}/wishlist/${this.userObject.user_id}`;
    return this.http.get(url);
  }

}
