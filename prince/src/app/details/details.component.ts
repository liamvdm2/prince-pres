import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsProductService } from './details-product.service';
import { WishlistService } from '../shared/wishlist.service';
import { UserService } from '../shared/user.service';

@Component({
 selector: 'app-details',
 templateUrl: './details.component.html',
 styleUrls: ['./details.component.css'],
 providers: [DetailsProductService]
})
export class DetailsComponent implements OnInit {
 product: any;
 currentUsername: string = '';

 constructor(private DetailsProductService: DetailsProductService, private route: ActivatedRoute, private wishlistService: WishlistService, private userService: UserService) { }

 ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id !== null) {
        this.DetailsProductService.getProductById(id).then((product: any) => {
          this.product = product;
          console.log(this.product); // Log the product to the console
        }).catch((err: any) => {
          // Handle error
        });
      }
    });
    this.userService.currentUser.subscribe(user => {
			this.currentUsername = user?.username;
		});
 }

 addToWishlist(productId: number) {
  this.wishlistService.addToWishlist(productId).subscribe(response => {
    console.log(response);
  });
}




 /*addToWishlist() {
  this.wishlistService.addToWishlist('USER_ID', this.product.id);
}*/

 /*WISHLIS*/
 wishlistIcon: string = 'fa-regular fa-heart';
  favoriteIcon: string = 'fa-regular fa-star';
  personalIcon: string = 'fa-solid fa-check';

  addToWishlist5(): void {
    this.wishlistIcon = this.wishlistIcon === 'fa-regular fa-heart' ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  }
  
  changeIconFavorite(): void {
    this.favoriteIcon = this.favoriteIcon === 'fa-regular fa-star' ? 'fa-solid fa-star' : 'fa-regular fa-star';
  }

  changeIconPersonal(): void {
    this.personalIcon = this.personalIcon === 'fa-solid fa-check' ? 'fa-solid fa-check-double' : 'fa-solid fa-check';
  }

}
