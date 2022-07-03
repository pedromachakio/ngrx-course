import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "express";
import { concatMap, map, tap } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { allCoursesLoadedActionCreator } from "./course.actions";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
  constructor(
    private action$: Actions,
    private router: Router,
    private coursesHttpService: CoursesHttpService
  ) {}

  loadCourses$ = createEffect(() =>
    this.action$.pipe(
      ofType(CourseActions.loadAllCoursesActionCreator), // effect will only reply to these actions
      concatMap((action) => this.coursesHttpService.findAllCourses()), // ensure that we only send one request at a time to BE
      map((courses) => allCoursesLoadedActionCreator({ courses }))
    )
  );
}
