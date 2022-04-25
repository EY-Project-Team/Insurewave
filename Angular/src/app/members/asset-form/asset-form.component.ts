import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { ClientComponent } from '../client/client.component';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.css'],
})
export class AssetFormComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  constructor(
    private toastr: ToastrService,
    private log1: AccountService,
    private http: HttpClient,
    private client: ClientComponent
  ) {}
  postassets: any = {"loginId" : this.log1.loggedUser.loginId } ;
  baseURL = 'http://localhost:5000/api/';
  ngOnInit(): void {}
  sendAssets() {
    if(this.postassets.assetName == null || this.postassets.assetPrice == null || this.postassets.quantity == null || this.postassets.contentType == null)
    {
      this.toastr.error("Fields can't be empty");
    }
    else{
    this.http.post(this.baseURL + 'account/assets', this.postassets).subscribe(
      (response) => {
        console.log(response);
        if (response != null) this.toastr.success('Success');
        this.client.getAssets();
        this.cancl();
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
    }
  }
  cancl(){
    this.cancel.emit(false);
  }
}
