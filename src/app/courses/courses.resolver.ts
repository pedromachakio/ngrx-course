import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first, tap } from "rxjs/operators";
import { GlobalAppState } from "../reducers";
import { loadAllCoursesActionCreator } from "./course.actions";

// router ensures that screen is not displayed if data hasnt been retrieved from backend yet
@Injectable()
export class CoursesResolver implements Resolve<any> {
  constructor(private globalAppStore: Store<GlobalAppState>) {}

  resolve(
    currentRoute: ActivatedRouteSnapshot,
    currentRouterState: RouterStateSnapshot
  ): Observable<any> {
    //check if courses are in store; if not dispatch loadAllCourses action; if they are there, do nothing

    return this.globalAppStore.pipe(
      tap(() => {
        this.globalAppStore.dispatch(loadAllCoursesActionCreator());
      }),
      first() // waits for Observable to emit a value
    );
  }
}
