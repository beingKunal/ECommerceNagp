import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Products/_Models/User';
import { AuthService } from '../Services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @Output() CancelRegister = new EventEmitter();
  registerForm: FormGroup;
  user: User;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
          ],
        ],

        confirmpassword: ['', Validators.required],
      },
      { validator: this.checkpasswordmatch }
    );
  }

  checkpasswordmatch(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value
      ? null
      : { mismatch: true };
  }

  register() {
    this.user = this.registerForm.value;
    this.toastr.success('Registered Succesfully','',{positionClass: 'toast-bottom-right'});

    this.authService.login(this.user).subscribe(() => {
      this.router.navigate(['']);
    });
  }

  Cancel() {
    this.router.navigate(['']);
  }

}
