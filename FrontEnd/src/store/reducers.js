import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import authReducer from "../reducers/authReducers";
import errorReducer from "../reducers/errorReducers";

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    auth: authReducer,
    errors: errorReducer,
    // Add sync reducers here
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}


export default makeRootReducer
