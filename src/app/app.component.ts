import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { GlobalAppState } from "./reducers";
import { isLoggedInSelector, isLoggedOutSelector } from "./auth/auth.selectors";
import { loginActionCreator, logoutActionCreator } from "./auth/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  constructor(
    private router: Router,
    private globalAppStore: Store<GlobalAppState>
  ) {}

  ngOnInit() {
    // check if the user already authenticated previously (before a refresh for example)
    const userProfile = localStorage.getItem("user");
    if (userProfile) {
      this.globalAppStore.dispatch(
        loginActionCreator({ user: JSON.parse(userProfile) })
      );
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: { // begin loading during navigation start
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd: // // end loading during navigation start
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: { 
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }

      this.isLoggedIn$ = this.globalAppStore.pipe(
        /*  map(
          (globalApplicationState) =>
            !!globalApplicationState["authorizationState"].user */
        // pega-se no GlobalAppState e vai-se ao que se quer, neste caso o state da authorization, named aqui src\app\auth\reducers\index.ts
        // e acede-se à propriedade que se quer, neste caso user
        // a double negation !!, a primeira negação transforma o valor num boolean com o valor oposto do seu valor, a segunda negação just makes it its actual value
        select(isLoggedInSelector)
      );

      this.isLoggedOut$ = this.globalAppStore.pipe(
        // select makes it so that values in the view are only updated when they change; eliminates repetições
        // queremos só verificar o output das expressoes !globalApplicationState["authorizationState"].user quando o valor do input mudar, otherwise é sempre o mesmo valor e
        // n vale a pena voltar a calcular again & again; para isso guarda-se o resultado das expressoes em cache com o ngrx selector
        select(isLoggedOutSelector)
      );
    });
  }

  logout() {
    this.globalAppStore.dispatch(logoutActionCreator());

    //this.router.navigateByUrl(""); // dont think its doing anything
  }
}
