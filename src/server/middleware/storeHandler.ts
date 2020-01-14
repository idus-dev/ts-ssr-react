import { createStore } from "redux";

import rootReducer from "../../client/reducers/rootReducer";

export default (data: any, req?: any) => {
  const preloadedState = {};

  // set initial state from server
  // handle preloaded state here
  return createStore(rootReducer, preloadedState);
};
