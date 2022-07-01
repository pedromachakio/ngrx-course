import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { select, Store } from "@ngrx/store";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { GlobalAppState } from "../reducers";
import { isLoggedInSelector } from "./auth.selectors";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private globalAppStore: Store<GlobalAppState>,
    private router: Router
  ) {} // para podermos checkar se o user ta logged in ou nao

  canActivate(
    route: ActivatedRouteSnapshot,
    currentRouterState: RouterStateSnapshot
  ): Observable<boolean> {
    // router will subscribe to this observable and complete the routing navigation if it receives true

    return this.globalAppStore.pipe(
      select(isLoggedInSelector), // boolean if loggedin or not

      tap((loggedInBoolean) => {
        // tap into the boolean to select side effects if not logged in
        if (!loggedInBoolean) {
          this.router.navigateByUrl("/login");
        }
      })
    );
  }
}
