import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css']
})
export class BrokerComponent implements OnInit {
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

  send(id : any, contr : any = {}, com : any)
  {
    contr = {"contractId" : id, "brokerCommission" : com}
    this.http.put<any>(this.baseURL + "Contract/broker/" + this.accountService.loggedUser.loginId,contr).subscribe((response) =>
    {
      this.toast.success("Successfully sent to Insurer");
      console.log(response);
      this.ngOnInit();
    }, (error) => {this.toast.error(error.error);
    console.log(error)})
  }
}
