import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CourseEntityService } from "./courses-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private coursesEntityService: CourseEntityService) {}

  resolve(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): Observable<boolean> {
    return (
      this.coursesEntityService
        .getAll() // http get request to BE; emits Observable of list of courses
        // ngrx based on conventions tries to guess this endpoint, but it can be customizable and not necessary /api/course(s), check courses-data.service.ts
        .pipe(
          map((listOfCourses) => !!listOfCourses) // to return boolean
        )
    );
  }
}
