import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { logger } from "../middleware/middleware";
import { crashReporter } from "../middleware/middleware";
import thunk from "redux-thunk";
import React, { createContext, useReducer, useContext } from "react";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(logger, crashReporter, thunk))
);

export default store;
