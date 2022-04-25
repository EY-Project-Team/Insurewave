import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { HomeComponent } from './home/home.component';
import { AssetFormComponent } from './members/asset-form/asset-form.component';
import { BrokerComponent } from './members/broker/broker.component';
import { ClientComponent } from './members/client/client.component';
import { ContractComponent } from './members/contract/contract.component';
import { InsurerComponent } from './members/insurer/insurer.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
    }).compileComponents();
  });

  

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Insurewave'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Insurewave');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('client app is running!');
  // });
});
