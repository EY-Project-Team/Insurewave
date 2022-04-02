import { IfStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoginPage';
  email:string='';
  password:string='';
  firstname:string='';
  gender:string='';
  lastname:string='';
  email1:string='';
  password1:string='';
  confirmpassword:string='';
  usertype:string='';

  confirmLogin(loginpage:NgForm):void{
       this.email=loginpage.controls['email'].value;
       this.password=loginpage.controls['password'].value;
       if(this.email==undefined || this.password==undefined){
         return ;
       }
       console.log(loginpage.value);
       
    
  }
  createUser(loginpage:NgForm):void{
    this.firstname=loginpage.controls['firstname'].value;
    this.lastname=loginpage.controls['lastname'].value;
    this.gender=loginpage.controls['gender'].value;
    this.email1=loginpage.controls['email1'].value;
    this.password1=loginpage.controls['password1'].value;
    this.usertype=loginpage.controls['usertype'].value;
    console.log(loginpage.value);
 
}
}
