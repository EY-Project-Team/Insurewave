import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ClientComponent } from './members/client/client.component';
import { ContractComponent } from './members/contract/contract.component';
import { BrokerComponent } from './members/broker/broker.component';
import { InsurerComponent } from './members/insurer/insurer.component';
import { ToastrModule } from 'ngx-toastr';
import { AssetFormComponent } from './members/asset-form/asset-form.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ClientComponent,
    ContractComponent,
    BrokerComponent,
    InsurerComponent,
    AssetFormComponent,
    ContractFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
