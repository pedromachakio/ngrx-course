import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, createSelector, on } from "@ngrx/store";

import { CourseActions } from "../action-types";
import { selectAllCourses } from "../courses.selectors";
import { Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {}

export const adapter = createEntityAdapter<Course>(); // facilita crud operations com Entity

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoadedActionCreator, (state, action) =>
    adapter.setAll(action.courses, state)
  )
);

export const {
  selectAll,
} /* to select which properties we specifically want exported */ =
  adapter.getSelectors();

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category == "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category == "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.promo).length
);
