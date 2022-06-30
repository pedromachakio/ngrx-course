import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";

export const authFeatureKey = "auth";

export interface GlobalAppState {}

export const reducers: ActionReducerMap<GlobalAppState> = {};
