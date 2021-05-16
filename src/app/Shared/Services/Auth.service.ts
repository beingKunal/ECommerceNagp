import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/Products/_Models/Product';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService{

  constructor(private http: HttpClient){}

  baseUrl = '../../assets/Templates/UserData.json';

  login(model: any) {
    return this.http.get(this.baseUrl).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          console.log("Username is"+user.Username);
          localStorage.setItem('token', user.Username);
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token
  }
}
