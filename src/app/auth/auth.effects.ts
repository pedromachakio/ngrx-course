import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { dispatch } from "rxjs/internal/observable/pairs";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";

@Injectable()
export class AuthEffects {
  // we want to as a side effect save the user profile in the local storage after a (login) action

  constructor(private action$: Actions, private router: Router) {}

  login$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.loginActionCreator), // gives auto completion and selects type of action
        tap((action) =>
          localStorage.setItem("user", JSON.stringify(action.user))
        )
      ),
    { dispatch: false }
  ); // to let ngrx effects know that this effect doesnt result in dispatching an action

  logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.logoutActionCreator),
        tap((action) => {
          localStorage.removeItem("user");
          this.router.navigateByUrl("/login");
        })
      ),
    { dispatch: false }
  );
}

//  not the best way to implement it, not typesafe, just a basic example
// action$.subscribe((action) => {
//  if (action.type == "[Login Page] User Login") {
//    wait for login action to be emitted
//    localStorage.setItem("user", JSON.stringify(action["user"]));  as a side effect of that action, save the user to local storage
//
//

// better way to filter for actions of login type with ngrx
// const login$ = this.action$.pipe(
//  ofType(AuthActions.loginActionCreator),
//  tap((loginAction) => {
//    localStorage.setItem("user", JSON.stringify(loginAction.user)); now we can write it in a type safe way
//  })  add side effect with tap
//   );
// and now we subscribe only to the observable of login actions, instead of an observable of all actions, as was done previously above
//login$.subscribe();  to add "automatic" error handling and avoid subscribing manually we have changed this and used the createEffect method
