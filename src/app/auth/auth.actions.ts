import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

export const loginActionCreator = createAction(
  "[Login Page] User Login", // Type of action following convention. [Source of action] Event the action corresponds to
  props<{ user: User }>() // payload
);

export const logoutActionCreator = createAction(
  "[Top Menu] User Logout" // payload not required
);
