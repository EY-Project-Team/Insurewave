import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'  //Injectable & Singleton
})
export class AccountService {
  baseUrl = 'http://localhost:5000/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  loggedUser : any ;
  constructor(private http: HttpClient) { }
  userType:any;

  login(model: any){
    return this.http.post(this.baseUrl + 'Account/login', model).pipe(
     map((response: User) => {
       const user = response;
       if(user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
        this.loggedUser = user;
        this.userType = this.loggedUser.userType;
       }
     })
    );
  }

register(model:any)
{
  return this.http.post(this.baseUrl + 'account/register', model).pipe(
    map((user: User) => {
      if(user){
        localStorage.setItem('user' , JSON.stringify(user))
        this.currentUserSource.next(user);
        this.loggedUser = user;
        this.userType = this.loggedUser.userType;
      }
      return user;
    })
  )
}

  setCurrentUser(user: User) {
    this.loggedUser = user;
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.loggedUser = null;
    this.userType = null;
  }
}
