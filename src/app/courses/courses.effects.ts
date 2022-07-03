import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { allCoursesLoadedActionCreator } from "./course.actions";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
  constructor(
    private action$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}

  loadCourses$ = createEffect(() =>
    this.action$.pipe(
      ofType(CourseActions.loadAllCoursesActionCreator), // effect will only reply to these actions
      concatMap((action) => this.coursesHttpService.findAllCourses()), // ensure that we only send one request at a time to BE, save sequentially, um acaba vai o outro
      map((courses) => allCoursesLoadedActionCreator({ courses }))
    )
  );

  saveCourse$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(CourseActions.courseUpdatedActionCreator),
        concatMap((action) =>
          this.coursesHttpService.saveCourse(
            action.update.id,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );
}
