import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Insurewave';
  user: any;
  // private http: HttpClient

  constructor(private accountService: AccountService) {}
  ngOnInit(){
    // this.getUsers();
    this.setCurrentUser();
  }
  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
 
// getUsers()
// {
//   this.http.get('http://localhost:5000/api/UserTables').subscribe(response => {
//     this.user = response;
//   }, error => {
//     console.log(error);
//   })
// }

}
