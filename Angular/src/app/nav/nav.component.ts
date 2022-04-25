import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  who = false;
  // loggedIn: boolean;
  // currentUser$ : Observable<User>;
  constructor(public accountService : AccountService,private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    // this.getCurrentUser();
    // this.currentUser$ = this.accountService.currentUser$;
  }
login(){
  this.accountService.login(this.model).subscribe(response =>
    {
      this.who = this.clientCheck(this.accountService.userType);
      if( this.accountService.userType == "Client" )
      {
      this.router.navigateByUrl('/client')
      console.log(response);
      }
      if(this.accountService.userType == "Broker")
      {
        this.router.navigateByUrl('/broker')
      console.log(response);
      }
      if(this.accountService.userType == "Insurer")
      {
        this.router.navigateByUrl('/insurer')
        console.log(response);
      }
      // this.loggedIn = true;
    },error => {
      console.log(error);
      this.toastr.error(error.error);
    })
}
logout(){
  this.accountService.logout();
  this.router.navigateByUrl('/')
  this.model = {"email" : "" , "password" : ""};
  this.ngOnInit();
  // this.loggedIn = false;
}
clientCheck(Type : any)
{
  if(Type == "Client")
  {
    return true;
  }
  else
  {
    return false;
  }
}

// getCurrentUser(){
//   this.accountService.currentUser$.subscribe(user => {
//     this.loggedIn = !!user;
//   }, error => {
//     console.log(error);
//   })
// }
}
