import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, createSelector, on } from "@ngrx/store";

import { CourseActions } from "../action-types";
import { selectAllCourses } from "../courses.selectors";
import { compareCourses, Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses, // compares 2 course entitites to sort them
  // would have to use selectId here ifproperty in course model was not "id"
}); // facilita crud operations com Entity

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(
    CourseActions.allCoursesLoadedActionCreator,
    (state, action) =>
      adapter.setAll(action.courses, { ...state, allCoursesLoaded: true }) // ...state para copiar o state todo mas alterar a prop allCoursesLoaded
  )
);

export const {
  selectAll,
} /* to select which properties we specifically want exported */ =
  adapter.getSelectors();
