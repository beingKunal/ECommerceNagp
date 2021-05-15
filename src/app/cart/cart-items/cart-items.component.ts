import { ToastrService } from 'ngx-toastr';
import { Product } from '../../Products/_Models/Product';
import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from './../cart-service.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../_models/Cart';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent implements OnInit {
  constructor(
    private cartService: CartServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  cartItems: Cart;
  totalPrice: number = 0;
  totalAmount: number = 0;
  discount: number = 10;
  deliveryCharges: number = 20;
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.cartItems = data['cartItems'];
    });
    this.getTotalPrice();
    //this.getCartItems();
  }
  Remove(product: Product) {
    this.cartItems.products.splice(
      this.cartItems.products.indexOf(product, 0),
      1
    );
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.products.forEach((product) => {
      this.totalPrice += product.price * product.quantity;
    });
    this.totalAmount = this.totalPrice;
  }

  increaseQty(product: Product) {
    product.quantity < 4
      ? (product.quantity += 1)
      : this.toastr.warning('Oops! Cannot exceed 4 quantities');
    this.getTotalPrice();
  }
  decreaseQty(product: Product) {
    product.quantity <= 1
      ? this.toastr.warning('Please remove item from Cart')
      : (product.quantity -= 1);
    this.getTotalPrice();
  }
}
