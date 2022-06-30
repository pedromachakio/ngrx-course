import { createSelector } from "@ngrx/store";

export const isLoggedInSelector = createSelector(
  // only runs if input changes, otherwise doesnt recalculate; keeps memory of previous executions in cache
  (globalAppState) => globalAppState["authorizationState"], // select which of all the app states i want to access (auth state in this case)
  (authorizationState) => !!authorizationState.user // and then select which property from the selected state i want to access, and return turn if there is a user (aka if it isnt undefined)
);

export const isLoggedOutSelector = createSelector(
  isLoggedInSelector, // mapping
  (isLoggedInSelector) => !isLoggedInSelector // inverting each boolean
);
