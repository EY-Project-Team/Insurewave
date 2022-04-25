import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContractComponent } from '../members/contract/contract.component';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css']
})
export class ContractFormComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  constructor(private toastr: ToastrService,
    private log1: AccountService,
    private http: HttpClient,
    private con : ContractComponent) { }
    contract : any = {"loginId" : this.log1.loggedUser.loginId ,"assuredSum" : 0 , "brokerCommission" : 0 , "totalAssetValue" : 0, "contracrStatus" : ''  } ;
    baseURL = 'http://localhost:5000/api/';
  ngOnInit(): void {
  }
  sendContract()
  {
    if(this.contract.businessChannel == null || this.contract.typeOfRisk == null || this.contract.contractEndDate == null || this.contract.contractType == null || this.contract.coveragePercentage == null || this.contract.contractStartDate == null)
    {
      this.toastr.error("Fields can't be empty");
    }
    else
    {
    this.http.post(this.baseURL + 'Contract/contracts/' + this.log1.loggedUser.loginId , this.contract).subscribe((response) => {
      console.log(response);
      if (response != null) this.toastr.success('Success');
      this.con.ngOnInit(); this.cancl();},(error) =>{
        console.log(error);
        this.toastr.error(error.error);
      } );
    }
  }
  cancl(){
    this.cancel.emit(false);
  }
}
