import { Product } from '../_Models/Product'
import { catchError } from 'rxjs/operators';
import { Observable ,of} from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from '../_Services/Product.service';

@Injectable()
export class ProductDetailResolver implements Resolve<Product> {
  constructor(
    private productService: ProductService,
    private router: Router
  ){}

  resolve(route: ActivatedRouteSnapshot): Observable<Product>{
    return this.productService.getProduct(route.params['id']).pipe(
      catchError(error => {
        return of(null);
      })
    )
  }
}
