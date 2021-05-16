import { Cart } from './../_models/Cart';
import { CartServiceService } from './../cart-service.service';
import { catchError } from 'rxjs/operators';
import { Observable ,of} from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class CartItemsResolver implements Resolve<Cart> {
  constructor(
    private cartService : CartServiceService,
    private router: Router
  ){}

  resolve(route: ActivatedRouteSnapshot): Observable<Cart>{
    return this.cartService.getCart().pipe(
      catchError(error => {
        return of(null);
      })
    )
  }
}
