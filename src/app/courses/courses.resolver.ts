import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { GlobalAppState } from "../reducers";
import { loadAllCoursesActionCreator } from "./course.actions";
import { areCoursesLoaded } from "./courses.selectors";

// router ensures that screen is not displayed if data hasnt been retrieved from backend yet
@Injectable()
export class CoursesResolver implements Resolve<any> {
  isLoading = false; // to avoid dispatching over and over while its already loading

  constructor(private globalAppStore: Store<GlobalAppState>) {}

  resolve(
    currentRoute: ActivatedRouteSnapshot,
    currentRouterState: RouterStateSnapshot
  ): Observable<any> {
    //check if courses are in store; if not dispatch loadAllCourses action; if they are there, do nothing

    return this.globalAppStore.pipe(
      select(areCoursesLoaded),
      tap((coursesLoaded) => {
        if (!this.isLoading && !coursesLoaded) {
          this.isLoading = true;
          this.globalAppStore.dispatch(loadAllCoursesActionCreator());
        }
      }),
      filter((coursesLoaded) => coursesLoaded),
      first(), // waits for Observable to emit a value
      finalize(() => (this.isLoading = false)) // as soon as observable ends, reset back to false
    );
  }
}
