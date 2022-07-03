import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";

// load data into store on app startup (before showing screen to user)
export const loadAllCoursesActionCreator = createAction(
  "[Courses Resolver] Load All Courses"
);

// confirm that the courses have been loaded
export const allCoursesLoadedActionCreator = createAction(
  "[Load Courses Effect] All Courses Have Been Loaded",
  props<{ courses: Course[] }>()
);
