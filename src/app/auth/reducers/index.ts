import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { AuthActions } from "../action-types";
import { User } from "../model/user.model";

export interface AuthState {
  user: User;
}

export const authFeatureKey = "authorizationState";

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.loginActionCreator, (previousState, action) => {
    return {
      user: action.user,
    };
  }),

  on(AuthActions.logoutActionCreator, (previousState, action) => {
    return {
      user: undefined,
    };
  })
);

// a reducer function always returns a new instance of the state instead of modifying
// the existing one
