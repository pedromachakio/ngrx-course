import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()
export class AuthEffects {
  // we want to as a side effect save the user profile in the local storage after a (login) action

  constructor(private action$: Actions) {
    // not the best way to implement it, not typesafe, just a basic example
    action$.subscribe((action) => {
      if (action.type == "[Login Page] User Login") { // wait for login action to be emitted 
        localStorage.setItem("user", JSON.stringify(action["user"])); // as a side effect of that action, save the user to local storage
      }
    });
  }
}
