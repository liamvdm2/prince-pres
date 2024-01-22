import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUser: any; // Assuming your user object has a 'username' property

  // Implement a method to set the logged-in user
  setLoggedInUser(user: any) {
    this.loggedInUser = user;
  }

  // Implement a method to get the logged-in user
  getLoggedInUser() {
    return this.loggedInUser;
  }

  /*private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private readonly http: HttpClient) {}

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  updateUser(user: any): void {
    this.userSubject.next(user);
  }

  getUsers() {
    return this.http.get('http://127.0.0.1:8000/api/users');
  }*/

  /*constructor(private readonly http: HttpClient) {}

  getUsers() {
    return this.http.get('http://127.0.0.1:8000/api/users');
  }
  
 /*private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(credentials: any) {
    return this.http.post('http://127.0.0.1:8000/api/login', credentials)
      .subscribe(
        (res: any) => {
          // Assuming the server sends user information after successful login
          this.currentUserSubject.next(res.user);
        },
        err => {
          console.error(err);
          // Handle failed login here
        }
      );
  }*/


}
