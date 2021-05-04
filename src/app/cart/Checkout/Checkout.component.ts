import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from './../cart-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Checkout',
  templateUrl: './Checkout.component.html',
  styleUrls: ['./Checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private cartService: CartServiceService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }
  checkOutForm: FormGroup;
  cartItems: any[];
  totalAmount: number = 0;
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.cartItems = data['cartItems'].products;
    });
    this.getCartItems();
    this.createCheckOutForm();
  }

  createCheckOutForm() {
    this.checkOutForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]*'), Validators.maxLength(6), Validators.minLength(6)]],
      cardname: ['', Validators.required],
      cardnumber: ['', Validators.required],
      expmonth: ['', [Validators.required,Validators.pattern('^[0-9]*'), Validators.min(1), Validators.max(12)]],
      expyear: ['', [Validators.required, Validators.pattern('^[0-9]{4}$'), Validators.min(new Date().getFullYear())]],
      sameaddress: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }
  placeOrder() {
    this.toastr.success("Order Placed Successfully", '', { positionClass: 'toast-bottom-right' });
  }

  getCartItems() {
    this.cartItems.forEach((item) => this.totalAmount += item.quantity * item.price)

  }
}
