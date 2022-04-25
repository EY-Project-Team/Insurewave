import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  baseURL = 'http://localhost:5000/api/';
  assets: any;
  contracts: any;
  Mode = false;
  constructor(
    private accountService: AccountService,
    private toast: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssets();
    this.getContracts();
  }
  getAssets() {
    this.http
      .get(
        this.baseURL +
          'account/assets/' +
          this.accountService.loggedUser.loginId
      )
      .subscribe(
        (response) => {
          this.assets = response;
          console.log(this.assets);
        },
        (error) => {
          console.log(error);
          this.toast.error(error.error);
        }
      );
  }

  deleteasset(id: any) {
    this.http.delete(this.baseURL + 'Account/DeleteAssets/' + id).subscribe(
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
  
  linkAsset(id: any, item: any = {}, assId : any , check : any) {
    if(check == null)
    {
    item = {"contractId" : id,
              "assetId": assId };
              console.log(item);
    
    this.http.put<any>(this.baseURL +'Account/assets/' +this.accountService.loggedUser.loginId , item)
      .subscribe(
        (response) => {
          console.log(response);
          this.ngOnInit();
          this.toast.info("Linked to Contract Successfully!")
        },
        (error) => {
          console.log(error);
          this.toast.error(error.error);
        }
      );
    }
    else
    {
      this.toast.warning("Contract Already Asssigned!");
    }
  }
}
