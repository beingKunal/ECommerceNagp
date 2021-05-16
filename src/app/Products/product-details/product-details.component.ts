import { AuthService } from '../../Shared/Services/Auth.service';
import { Cart } from './../../cart/_models/Cart';
import { CartServiceService } from './../../cart/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../_Models/Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private cartService: CartServiceService,
    private authService: AuthService
  ) { }
  product: Product;
  ifGoToCart:boolean = false;
  cart: Cart;
  ngOnInit(): void {
    // console.log("hello");
    this.route.data.subscribe((data) => {
      this.product = data['product'];
    });
  }

  cartOptions(item: Product, target , ifGoToCart:boolean){
    ifGoToCart?this.router.navigate(['/Cart']):this.addtoCart(item, target)
  }
  addtoCart(item: Product, target ) {
    this.cartService.getCart().subscribe((data) => {
      this.cart = data;
      // console.log("Product", item)
      // console.log("products", this.cart.products)

      // console.log("Index is", this.cart.products.findIndex((product)=>product.id == product.id,1))
      // console.log("Filter ?", this.cart.products.filter((product) => product.id == product.id))
      this.cart.products.filter((product) => product.id == item.id).length > 0
        ? this.toastr.info("Already in Cart")
        : this.updateCart(item)

    }, (error) => {this.toastr.error(error)}, () => {
      // console.log("In complete")
      target.textContent = 'Go To Cart';
      this.ifGoToCart = true
    });

  }

  updateCart(product: Product) {
    product.quantity = 1;
    this.cart.products.push(product);
    // console.log("inside update cart", this.cart)

      this.toastr.success(this.product.title + ' added to Cart!');

  }

  loggedIn() {
    return this.authService.loggedIn();
  }
  navigate() {
    this.router.navigate([''])
  }
}
