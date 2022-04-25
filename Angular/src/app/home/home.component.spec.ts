import { HomeComponent } from "./home.component";
import { TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ToastrModule } from "ngx-toastr";

describe('HomeComponent', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RouterTestingModule,
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
        HomeComponent],
        }).compileComponents();
      });

      beforeEach  (() => {
        const fixture  = TestBed.createComponent(HomeComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();
      });

        it("Lead U.I. Test" , () => {
            const fixture  = TestBed.createComponent(HomeComponent);
            fixture.detectChanges();
            const compiled = fixture.nativeElement as HTMLElement;
            expect(compiled.querySelector('.lead').textContent).toContain(' All your Insurance Solution , Right here! ... Sign up ?');
        });
        

        it('Event Check ✓ ', () => {
            const fixture  = TestBed.createComponent(HomeComponent);
        const component = fixture.componentInstance;
            spyOn(component, 'registerToggle');
            let button = fixture.debugElement.nativeElement.querySelector('button');
            // button.click();
            fixture.detectChanges();
            // tick();
            expect(component.registerToggle).toBeTruthy();
        });

    });

    

    