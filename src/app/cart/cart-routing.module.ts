import { CheckoutComponent } from './Checkout/Checkout.component';
import { CartItemsResolver } from './_Resolvers/cart-Items.resolver';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{
  path: '',
  component: CartItemsComponent,
  resolve:{cartItems:CartItemsResolver}
},{path:'checkout', component:CheckoutComponent,resolve:{cartItems:CartItemsResolver}}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule{}
