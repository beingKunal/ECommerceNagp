import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../Services/Auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let service: AuthService
  let spy:any
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule, RouterTestingModule, ToastrModule.forRoot(), TranslateModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    service = TestBed.inject(AuthService)
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('loggedIn of component returns false when the user has not been loggedIn in AuthService', () => {
    console.log("I am service",service)
    spy = spyOn(service , 'loggedIn').and.returnValue(false);
    expect(component.loggedIn()).toBeFalsy();
    expect(service.loggedIn).toHaveBeenCalled();
  });

  it('loggedIn of component returns true when the user has been loggedIn in AuthService', () => {
    spy = spyOn(service , 'loggedIn').and.returnValue(true);
    expect(component.loggedIn()).toBeTruthy();
    expect(service.loggedIn).toHaveBeenCalled();
  });

  it('LoginForm should not be present when LoggedIn', () => {
    spy = spyOn(component , 'loggedIn').and.returnValue(true);
    fixture.detectChanges()
    el = fixture.debugElement.query(By.css('form'));
    expect(el).toBeFalsy();
  });

  it('LoginForm should be present when not LoggedIn', () => {
    spy = spyOn(component , 'loggedIn').and.returnValue(false);
    el = fixture.debugElement.query(By.css('form'));
    expect(el).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
