import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
})
export class ContractComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private toast: ToastrService,
    private http: HttpClient,
    private router: Router
  ) { }
  contracts: any;
  Mode = false;
  ngOnInit(): void {
    this.getContracts();
  }
  baseURL = 'http://localhost:5000/api/';
  getContracts() {
    this.http
      .get(
        this.baseURL +
        'Contract/Contracts/' +
        this.accountService.loggedUser.loginId
      )
      .subscribe(
        (response) => {
          this.contracts = response;
          console.log(response);
        },
        (error) => {
          console.log(error);
          this.toast.error(error.error);
        }
      );
  }
  toBroker(cont:any , item : any = {})
  {
    item = {"contractId" : cont};
    this.http.put<any>(
      this.baseURL +
      'Contract/contracts/' +
      this.accountService.loggedUser.loginId
    ,item).subscribe((response) => {console.log(response); this.ngOnInit();},
    (error) => {console.log(error);  this.toast.error(error.error);
  });
  }
  deletecont(id:any)
  {
    this.http.delete(this.baseURL + 'Contract/Delcontracts/' + id).subscribe(
      (response) => {
        console.log(response);
        if (response != null) this.toast.warning('Deletion Succeded!');
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.toast.error(error.error);
      }
    );
  }
  addMode() {
    this.Mode = !this.Mode;
  }
  cancelMode(event: boolean) {
    this.Mode = false;
  }
}
