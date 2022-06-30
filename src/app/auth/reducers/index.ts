import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { AuthActions } from "../action-types";
import { User } from "../model/user.model";

export interface AuthState {
  user: User;
}

export const authFeatureKey = "auth";

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginActionCreator, (previousState, action) => {
    return {
      user: action.user,
    };
  })
);
