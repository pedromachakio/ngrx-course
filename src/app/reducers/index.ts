import { routerReducer } from "@ngrx/router-store";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";

export interface GlobalAppState {}

export const reducers: ActionReducerMap<GlobalAppState> = {
  router: routerReducer, // corresponds to the stateKey in app.module, so has to be same value
};
