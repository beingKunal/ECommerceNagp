import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './Auth.service';

describe('Auth Service Testing', () => {
  let service: AuthService;
  let spy:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler]
    });
    service = TestBed.inject(AuthService);
  });
  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });

  it('should return true from loggedIn when there is a token', () => {
    localStorage.setItem('token', 'username');
    expect(service.loggedIn()).toBeTruthy();
  })
  it('should return false from loggedIn when there is no token', () => {
    expect(service.loggedIn()).toBeFalsy();
  });
});
