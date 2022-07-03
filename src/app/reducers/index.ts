import { routerReducer } from "@ngrx/router-store";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";

export interface GlobalAppState {}

export const reducers: ActionReducerMap<GlobalAppState> = {
  router: routerReducer, // corresponds to the stateKey in app.module, so has to be same value
};

export function loggerReducer(
  reducersToBeInvokedAfterMetaReducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    console.log("Previous state: ", state);
    console.log("Current action dispatched: ", action);
    return reducersToBeInvokedAfterMetaReducer(state, action);
  };
}

export const metaReducers: MetaReducer<GlobalAppState>[] =
  !environment.production ? [loggerReducer] : []; // first array is development, second is production ofc
