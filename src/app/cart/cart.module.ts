import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './Checkout/Checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CartItemsResolver } from './_Resolvers/cart-Items.resolver';
import { HttpLoaderFactory } from '../app.module';


@NgModule({
  declarations: [
    CartItemsComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CartRoutingModule,
    ReactiveFormsModule,

    TranslateModule.forChild({
      extend: true
    })
  ],
  providers:[CartItemsResolver]
  // exports:[CartItemsComponent]
})
export class CartModule { }
