import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";

import { CourseActions } from "../action-types";
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
