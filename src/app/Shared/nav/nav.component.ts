import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private translate : TranslateService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  login() {
    this.loginForm.get('Password').reset()
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.toastr.success('login Successful');
      },
      (error) => {
        this.toastr.error('Login Error');
      },

    );
  }

  loggedIn():boolean {
    return this.authService.loggedIn();
  }

  Logout(event) {
    console.log(event)
    localStorage.removeItem('token');
    this.toastr.success('LogOut Succesfully');
    this.router.navigate(['']);
  }

  Register() {
    this.router.navigate(['/register']);
  }
  changeLanguage(lang : string){
    this.translate.use(lang)
  }
}
