import { filter, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/Products/_Models/Product';
import { BehaviorSubject, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService{
  constructor(private http: HttpClient){}
  baseUrl = environment.BASE_URL;
  searchKey = new BehaviorSubject<string>("");

  getProducts(){
    return this.http.get<Product[]>(this.baseUrl+'/products')
  }

  getProduct(id:number){
    return this.http.get<Product[]>(this.baseUrl+`/products/+${id}`)
  }

  filterProductsByCategory(category:string){
    return this.http.get<Product[]>(this.baseUrl+'/products')
    .pipe(map(data => data.filter(product => product.category == category)));
  }

  searchProducts(keyword:string){
    keyword = keyword.toLowerCase()
    return this.http.get<Product[]>(this.baseUrl+'/products')
    .pipe(map(data => data.filter(product => product.description.toLowerCase().includes(keyword)
                                  || product.title.toLowerCase().includes(keyword))));
  }

  getCategories(){
    // https://fakestoreapi.com/products/categories
    return this.http.get<string[]>(this.baseUrl+'/products/categories')
  }
}
