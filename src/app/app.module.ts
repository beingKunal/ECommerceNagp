import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Shared/nav/nav.component';
import { ProductDetailsComponent } from './Products/product-details/product-details.component';
import { ProductGridComponent } from './Products/product-grid/product-grid.component';
import { ProductComponent } from './Products/Product/product.component';
import { ProductDetailResolver } from './Products/_Resolvers/product-detail.resolver';
import { ProductGridResolver } from './Products/_Resolvers/product-grid.resolver';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './Shared/register/register.component';
import { CategoriesComponent } from './Products/categories/categories.component';
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader'

export function HttpLoaderFactory(httpClient){
  return new TranslateHttpLoader(httpClient)
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductGridComponent,
    ProductComponent,
    ProductDetailsComponent,
    RegisterComponent,
    CategoriesComponent,
    PageNotFoundComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    TranslateModule.forRoot({
      loader:{provide:TranslateLoader,useFactory:HttpLoaderFactory ,deps:[HttpClient]}
    })
  ],

  // exports:[RegisterComponent],
  providers: [ProductDetailResolver,ProductGridResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
