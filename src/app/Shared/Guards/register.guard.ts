import { AuthService } from '../Services/Auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(
    private route: Router,
    private authService : AuthService,
    private toastr: ToastrService
  ) {}
  canActivate(): boolean {
    if (!this.authService.loggedIn()) {
      return true;
    }
    else{
     this.toastr.warning("Already Registered");
      this.route.navigate(['']);
      return false;
    }
  }
}
