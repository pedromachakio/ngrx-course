import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./reducers/course.reducers";
import * as fromCourses from "./reducers/course.reducers";


export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll // gets ordered list of courses
)