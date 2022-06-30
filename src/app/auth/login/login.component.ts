import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { GlobalAppState } from "../../reducers";
import { loginActionCreator } from "../auth.actions";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<GlobalAppState>
  ) {
    this.form = formBuilder.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const formValue = this.form.value;

    this.authService
      .login(formValue.email, formValue.password) // returns an Observable, so we gotta subscribe to it

      .pipe(
        tap((user) => {
          // tap allows us to create side effects, como log & store User info on NgRx, e redirect to /courses, in this case

          console.log(user);

          this.store.dispatch(loginActionCreator({ user })); // dispatching actions is the way to modify the store state; allows 4 loose coupling

          this.router.navigateByUrl("/courses");
        })
      )
      .subscribe(
        noop, // if everything goes to plan, no operation
        () => alert("Login failed") // otherwise handle errors
      );
  }

  
}
