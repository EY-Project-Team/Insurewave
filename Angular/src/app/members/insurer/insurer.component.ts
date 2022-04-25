import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-insurer',
  templateUrl: './insurer.component.html',
  styleUrls: ['./insurer.component.css']
})
export class InsurerComponent implements OnInit {
  contracts : any ; 
  baseURL = 'http://localhost:5000/api/';
  constructor(private accountService: AccountService,
    private toast: ToastrService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.getContracts();
  }
  getContracts()
  {
    this.http.get(this.baseURL + "Contract/all/" + this.accountService.loggedUser.loginId , this.accountService.loggedUser.userType).subscribe((response) =>
    {
      this.contracts = response;
    }, (error) => {this.toast.error(error.error);
    console.log(error)})
  }
  signContract(id : any , status : any , Comments : any , Premium : any , Sum : any , model : any)
  {
    model = {"contractId" : id , "contracrStatus" : status , "insurerComments" :Comments , "monthlyPremium" : Premium , "assuredSum" : Sum};
    this.http.put<any>(this.baseURL + "Contract/Insurer/" + this.accountService.loggedUser.loginId , model).subscribe((response) => {
      this.toast.info("Contract Reverted To User");
      this.getContracts();
      console.log(response);
    },(error) => {this.toast.error(error.error);})
  }
}
