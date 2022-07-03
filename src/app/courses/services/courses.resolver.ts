import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./courses-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private coursesEntityService: CourseEntityService) {}

  resolve(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> {
    // loaded is default property present, can check via redux devtools, emits true when data has always been loaded (it starts as false)
    return this.coursesEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.coursesEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded), // making sure we wait for the data to be loaded in the store
      first() // completing the observable and ensuring transition goes through
    );
  }
}
